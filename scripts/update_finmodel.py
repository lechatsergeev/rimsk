from __future__ import annotations

import shutil
import zipfile
import xml.etree.ElementTree as ET
from decimal import Decimal, ROUND_CEILING, ROUND_HALF_UP
from pathlib import Path


MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
ET.register_namespace("", MAIN_NS)
NS = {"m": MAIN_NS}

ROOT = Path(__file__).resolve().parents[1]
WORKBOOK_PATH = ROOT / "Расчеты" / "pizza_unit_economics_v2-1.xlsx"
BACKUP_PATH = ROOT / "Расчеты" / "pizza_unit_economics_v2-1.backup.xlsx"


def qname(tag: str) -> str:
    return f"{{{MAIN_NS}}}{tag}"


def money(value: Decimal, places: str = "0.01") -> str:
    quantized = value.quantize(Decimal(places), rounding=ROUND_HALF_UP)
    text = format(quantized, "f")
    if "." in text:
      text = text.rstrip("0").rstrip(".")
    return text


def integer(value: Decimal) -> str:
    return str(int(value.quantize(Decimal("1"), rounding=ROUND_HALF_UP)))


def ratio(value: Decimal) -> str:
    return format(value.quantize(Decimal("0.000001"), rounding=ROUND_HALF_UP), "f").rstrip("0").rstrip(".")


def get_shared_strings(root: ET.Element) -> list[ET.Element]:
    return root.findall("m:si", NS)


def add_shared_string(root: ET.Element, text: str) -> int:
    si = ET.Element(qname("si"))
    t = ET.SubElement(si, qname("t"))
    t.text = text
    root.append(si)
    count = len(get_shared_strings(root))
    root.set("count", str(count))
    root.set("uniqueCount", str(count))
    return count - 1


def get_or_create_row(sheet_root: ET.Element, row_num: int) -> ET.Element:
    sheet_data = sheet_root.find("m:sheetData", NS)
    assert sheet_data is not None
    for row in sheet_data.findall("m:row", NS):
        if int(row.attrib["r"]) == row_num:
            return row
    row = ET.SubElement(sheet_data, qname("row"), {"r": str(row_num)})
    return row


def cell_sort_key(ref: str) -> tuple[int, int]:
    col = 0
    row = ""
    for ch in ref:
        if ch.isalpha():
            col = col * 26 + (ord(ch.upper()) - 64)
        else:
            row += ch
    return int(row), col


def get_or_create_cell(sheet_root: ET.Element, ref: str) -> ET.Element:
    row_num = int("".join(ch for ch in ref if ch.isdigit()))
    row = get_or_create_row(sheet_root, row_num)
    for cell in row.findall("m:c", NS):
        if cell.attrib["r"] == ref:
            return cell
    cell = ET.Element(qname("c"), {"r": ref})
    row.append(cell)
    row[:] = sorted(list(row), key=lambda c: cell_sort_key(c.attrib["r"]))
    return cell


def set_number(sheet_root: ET.Element, ref: str, value: str) -> None:
    cell = get_or_create_cell(sheet_root, ref)
    cell.attrib.pop("t", None)
    for child in list(cell):
        if child.tag != qname("v"):
            cell.remove(child)
    v = cell.find("m:v", NS)
    if v is None:
        v = ET.SubElement(cell, qname("v"))
    v.text = value


def set_text(sheet_root: ET.Element, shared_root: ET.Element, ref: str, text: str) -> None:
    idx = add_shared_string(shared_root, text)
    cell = get_or_create_cell(sheet_root, ref)
    cell.attrib["t"] = "s"
    for child in list(cell):
        if child.tag != qname("v"):
            cell.remove(child)
    v = cell.find("m:v", NS)
    if v is None:
        v = ET.SubElement(cell, qname("v"))
    v.text = str(idx)


def load_xml(contents: dict[str, bytes], name: str) -> ET.Element:
    return ET.fromstring(contents[name])


def save_xml(contents: dict[str, bytes], name: str, root: ET.Element) -> None:
    contents[name] = ET.tostring(root, encoding="utf-8", xml_declaration=True)


def monthly_receipts(revenues: list[Decimal]) -> list[Decimal]:
    receipts: list[Decimal] = []
    prev = Decimal("0")
    for revenue in revenues:
        receipts.append(revenue / 2 + prev / 2)
        prev = revenue
    return receipts


def main() -> None:
    if not BACKUP_PATH.exists():
        shutil.copy2(WORKBOOK_PATH, BACKUP_PATH)

    with zipfile.ZipFile(WORKBOOK_PATH, "r") as zf:
        contents = {name: zf.read(name) for name in zf.namelist()}

    shared_root = load_xml(contents, "xl/sharedStrings.xml")
    sheet1 = load_xml(contents, "xl/worksheets/sheet1.xml")
    sheet2 = load_xml(contents, "xl/worksheets/sheet2.xml")
    sheet3 = load_xml(contents, "xl/worksheets/sheet3.xml")
    sheet4 = load_xml(contents, "xl/worksheets/sheet4.xml")

    price_b2b = Decimal("350")
    menu_x23 = Decimal("805")
    menu_x25 = Decimal("875")
    monthly_fixed = Decimal("10000")
    weekly_orders = Decimal("10")
    monthly_orders = Decimal("43")
    delivery_per_drop = Decimal("450")
    deliveries_per_month = Decimal("4.3")
    delivery_per_client_month = delivery_per_drop * deliveries_per_month

    flour_cost = (Decimal("1092") / Decimal("10")) * Decimal("0.12")
    dough_cost = flour_cost
    sauce_cost = (Decimal("1721") / Decimal("4.1")) * Decimal("0.04")
    mozzarella_cost = Decimal("699") * Decimal("0.06")
    pepperoni_cost = (Decimal("500") / Decimal("0.5")) * Decimal("0.04")
    mushroom_cost = Decimal("23")

    margherita_ingredients = dough_cost + sauce_cost + mozzarella_cost + Decimal("12")
    pepperoni_ingredients = dough_cost + sauce_cost + mozzarella_cost + pepperoni_cost + Decimal("6")
    mushrooms_ingredients = dough_cost + sauce_cost + mozzarella_cost + mushroom_cost + Decimal("6")
    mix_avg_ingredients = (
        margherita_ingredients * Decimal("0.4")
        + pepperoni_ingredients * Decimal("0.4")
        + mushrooms_ingredients * Decimal("0.2")
    )

    def cogs(ingredients: Decimal) -> Decimal:
        return ingredients + ingredients * Decimal("0.06") + Decimal("10") + Decimal("4") + Decimal("2")

    margherita_cogs = cogs(margherita_ingredients)
    pepperoni_cogs = cogs(pepperoni_ingredients)
    mushrooms_cogs = cogs(mushrooms_ingredients)
    mix_avg_cogs = cogs(mix_avg_ingredients)

    def margin(value: Decimal) -> Decimal:
        return price_b2b - value

    margherita_margin = margin(margherita_cogs)
    pepperoni_margin = margin(pepperoni_cogs)
    mushrooms_margin = margin(mushrooms_cogs)
    mix_avg_margin = margin(mix_avg_cogs)
    contribution_per_pizza = mix_avg_margin - delivery_per_client_month / monthly_orders

    break_even_units = (monthly_fixed / contribution_per_pizza).quantize(Decimal("1"), rounding=ROUND_CEILING)
    break_even_clients = (break_even_units / monthly_orders).quantize(Decimal("1"), rounding=ROUND_CEILING)
    break_even_revenue = break_even_units * price_b2b

    client_revenue = monthly_orders * price_b2b
    client_cost_with_delivery = monthly_orders * mix_avg_cogs + delivery_per_client_month
    client_margin_after_delivery = client_revenue - client_cost_with_delivery

    # Sheet 1: unit economics
    sheet1_updates = {
        "B5": money(dough_cost),
        "C5": money(dough_cost),
        "D5": money(dough_cost),
        "B6": money(sauce_cost),
        "C6": money(sauce_cost),
        "D6": money(sauce_cost),
        "B7": money(mozzarella_cost),
        "C7": money(mozzarella_cost),
        "D7": money(mozzarella_cost),
        "C8": money(pepperoni_cost),
        "D9": money(mushroom_cost),
        "B12": money(margherita_ingredients),
        "C12": money(pepperoni_ingredients),
        "D12": money(mushrooms_ingredients),
        "E12": money(mix_avg_ingredients),
        "B14": money(margherita_ingredients),
        "C14": money(pepperoni_ingredients),
        "D14": money(mushrooms_ingredients),
        "E14": money(mix_avg_ingredients),
        "B16": money(margherita_ingredients * Decimal("0.06")),
        "C16": money(pepperoni_ingredients * Decimal("0.06")),
        "D16": money(mushrooms_ingredients * Decimal("0.06")),
        "E16": money(mix_avg_ingredients * Decimal("0.06")),
        "B19": money(margherita_cogs),
        "C19": money(pepperoni_cogs),
        "D19": money(mushrooms_cogs),
        "E19": money(mix_avg_cogs),
        "B21": money(price_b2b),
        "C21": money(price_b2b),
        "D21": money(price_b2b),
        "E21": money(price_b2b),
        "B22": money(margherita_margin),
        "C22": money(pepperoni_margin),
        "D22": money(mushrooms_margin),
        "E22": money(mix_avg_margin),
        "B23": ratio(margherita_margin / price_b2b),
        "C23": ratio(pepperoni_margin / price_b2b),
        "D23": ratio(mushrooms_margin / price_b2b),
        "E23": ratio(mix_avg_margin / price_b2b),
        "B24": money(menu_x23),
        "C24": money(menu_x23),
        "D24": money(menu_x23),
        "E24": money(menu_x23),
        "B25": money(menu_x25),
        "C25": money(menu_x25),
        "D25": money(menu_x25),
        "E25": money(menu_x25),
        "E27": money(monthly_fixed),
        "E28": money(contribution_per_pizza),
        "E29": integer(break_even_units),
        "E30": integer(break_even_clients),
        "E31": integer(break_even_revenue),
        "E33": money(weekly_orders),
        "E34": money(monthly_orders),
        "E35": integer(client_revenue),
        "E36": money(client_cost_with_delivery),
        "E37": money(client_margin_after_delivery),
    }
    for ref, value in sheet1_updates.items():
        set_number(sheet1, ref, value)

    set_text(sheet1, shared_root, "F5", "10 кг муки = 1 092 руб.; в модели заложено 120 г муки на пиццу")
    set_text(sheet1, shared_root, "F6", "1 721 руб. за 4,1 кг; в модели заложено 40 г соуса на пиццу")
    set_text(sheet1, shared_root, "F7", "699 руб./кг; в модели заложено 60 г моцареллы на пиццу")
    set_text(sheet1, shared_root, "F8", "500 руб. за 500 г; в модели заложено ~40 г пепперони на пиццу")
    set_text(sheet1, shared_root, "A28", "Средняя маржа с пиццы после доставки")
    set_text(sheet1, shared_root, "F28", "Средняя маржа после доставки при 43 шт./мес. и 4,3 поставки")
    set_text(sheet1, shared_root, "A36", "Переменные затраты + доставка (руб./мес.)")
    set_text(sheet1, shared_root, "F36", "COGS + доставка 450 руб. × 4,3 поставки")
    set_text(sheet1, shared_root, "A37", "Маржа от клиента после доставки (руб./мес.)")
    set_text(sheet1, shared_root, "F37", "Выручка − COGS − доставка")

    quick_clients = [5, 10, 15, 20, 30, 40]
    quick_qty = [Decimal(str(c)) * monthly_orders for c in quick_clients]
    quick_revenue = [q * price_b2b for q in quick_qty]
    quick_cogs = [q * mix_avg_cogs for q in quick_qty]
    quick_gross = [quick_revenue[i] - quick_cogs[i] for i in range(len(quick_clients))]
    quick_net: list[Decimal] = []
    for idx, clients_count in enumerate(quick_clients):
        ebitda = quick_gross[idx] - monthly_fixed - Decimal(str(clients_count)) * delivery_per_client_month
        quick_net.append(ebitda * Decimal("0.85") if ebitda > 0 else ebitda)

    quick_refs = {
        40: (quick_clients[0], quick_qty[0], quick_revenue[0], quick_cogs[0], quick_gross[0], quick_net[0]),
        41: (quick_clients[1], quick_qty[1], quick_revenue[1], quick_cogs[1], quick_gross[1], quick_net[1]),
        42: (quick_clients[2], quick_qty[2], quick_revenue[2], quick_cogs[2], quick_gross[2], quick_net[2]),
        43: (quick_clients[3], quick_qty[3], quick_revenue[3], quick_cogs[3], quick_gross[3], quick_net[3]),
        44: (quick_clients[4], quick_qty[4], quick_revenue[4], quick_cogs[4], quick_gross[4], quick_net[4]),
        45: (quick_clients[5], quick_qty[5], quick_revenue[5], quick_cogs[5], quick_gross[5], quick_net[5]),
    }
    for row, (clients_value, qty_value, revenue_value, cogs_value, gross_value, net_value) in quick_refs.items():
        set_number(sheet1, f"A{row}", integer(Decimal(str(clients_value))))
        set_number(sheet1, f"B{row}", integer(qty_value))
        set_number(sheet1, f"C{row}", integer(revenue_value))
        set_number(sheet1, f"D{row}", money(cogs_value))
        set_number(sheet1, f"E{row}", money(gross_value))
        set_number(sheet1, f"F{row}", money(net_value))

    set_text(
        sheet1,
        shared_root,
        "A46",
        "* Чистая маржа = (Валовая маржа − 10 000 руб. постоянных расходов − доставка 1 935 руб./клиент) × 85%.",
    )

    # Sheet 2: assumptions
    set_text(sheet2, shared_root, "B9", "1 092 руб. / 10 кг")
    set_text(sheet2, shared_root, "C9", "Цена муки для текущей себестоимости теста")
    set_text(sheet2, shared_root, "B10", "699 руб./кг")
    set_text(sheet2, shared_root, "C10", "Цена моцареллы для текущей модели")
    set_text(sheet2, shared_root, "B14", "350 руб./шт.")
    set_text(sheet2, shared_root, "B17", "×2,3–2,5")
    set_text(sheet2, shared_root, "C17", "Цена гостя ~805–875 руб.")
    set_text(sheet2, shared_root, "B21", "450 руб./поставка")
    set_text(sheet2, shared_root, "C21", "При 4,3 поставки в месяц это ~1 935 руб. на клиента")

    # Sheet 3: detailed P&L
    clients = [5, 7, 8, 10, 12, 13, 15, 16, 18, 20, 22, 24]
    pizzas_per_client = [65, 65, 65, 65, 65, 108, 108, 108, 108, 108, 108, 108]
    total_pizzas = [Decimal(str(a * b)) for a, b in zip(clients, pizzas_per_client)]
    margherita_qty = [q * Decimal("0.4") for q in total_pizzas]
    pepperoni_qty = [q * Decimal("0.4") for q in total_pizzas]
    mushrooms_qty = [q * Decimal("0.2") for q in total_pizzas]
    revenues = [q * price_b2b for q in total_pizzas]

    margherita_ing_total = [margherita_ingredients * q for q in margherita_qty]
    pepperoni_ing_total = [pepperoni_ingredients * q for q in pepperoni_qty]
    mushrooms_ing_total = [mushrooms_ingredients * q for q in mushrooms_qty]
    margherita_waste = [value * Decimal("0.06") for value in margherita_ing_total]
    pepperoni_waste = [value * Decimal("0.06") for value in pepperoni_ing_total]
    mushrooms_waste = [value * Decimal("0.06") for value in mushrooms_ing_total]
    packaging = [q * Decimal("10") for q in total_pizzas]
    utilities = [q * Decimal("4") for q in total_pizzas]
    amortization = [q * Decimal("2") for q in total_pizzas]
    total_cogs = [
        margherita_ing_total[i]
        + margherita_waste[i]
        + pepperoni_ing_total[i]
        + pepperoni_waste[i]
        + mushrooms_ing_total[i]
        + mushrooms_waste[i]
        + packaging[i]
        + utilities[i]
        + amortization[i]
        for i in range(12)
    ]
    gross_margin = [revenues[i] - total_cogs[i] for i in range(12)]
    margin_ratio = [gross_margin[i] / revenues[i] for i in range(12)]
    logistics = [Decimal(str(c)) * delivery_per_client_month for c in clients]
    marketing = [
        Decimal("5000"),
        Decimal("5000"),
        Decimal("3000"),
        Decimal("3000"),
        Decimal("3000"),
        Decimal("3000"),
        Decimal("2000"),
        Decimal("2000"),
        Decimal("2000"),
        Decimal("2000"),
        Decimal("2000"),
        Decimal("2000"),
    ]
    subscriptions = [Decimal("2000")] * 12
    misc = [Decimal("5000")] * 12
    helper_salary = [
        Decimal("0"),
        Decimal("0"),
        Decimal("0"),
        Decimal("25000"),
        Decimal("25000"),
        Decimal("25000"),
        Decimal("25000"),
        Decimal("25000"),
        Decimal("25000"),
        Decimal("25000"),
        Decimal("25000"),
        Decimal("25000"),
    ]
    founder_salary = [Decimal("0")] * 7 + [Decimal("30000")] * 5
    payroll_taxes = [
        Decimal("0"),
        Decimal("0"),
        Decimal("0"),
        Decimal("7500"),
        Decimal("7500"),
        Decimal("7500"),
        Decimal("7500"),
        Decimal("16500"),
        Decimal("16500"),
        Decimal("16500"),
        Decimal("16500"),
        Decimal("16500"),
    ]
    payroll_total = [
        helper_salary[i] + founder_salary[i] + payroll_taxes[i] for i in range(12)
    ]
    total_fixed = [
        logistics[i] + marketing[i] + subscriptions[i] + misc[i] + payroll_total[i]
        for i in range(12)
    ]
    ebitda = [gross_margin[i] - total_fixed[i] for i in range(12)]
    taxes = [
        (value * Decimal("0.15")).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
        if value > 0
        else Decimal("0")
        for value in ebitda
    ]
    net_profit = [ebitda[i] - taxes[i] for i in range(12)]
    net_margin_ratio = [net_profit[i] / revenues[i] for i in range(12)]
    cumulative_profit: list[Decimal] = []
    cumulative = Decimal("0")
    for value in net_profit:
        cumulative += value
        cumulative_profit.append(cumulative)

    for idx, col in enumerate("BCDEFGHIJKLM", start=0):
        set_number(sheet3, f"{col}14", money(margherita_qty[idx] * price_b2b))
        set_number(sheet3, f"{col}15", money(pepperoni_qty[idx] * price_b2b))
        set_number(sheet3, f"{col}16", money(mushrooms_qty[idx] * price_b2b))
        set_number(sheet3, f"{col}17", money(revenues[idx]))
        set_number(sheet3, f"{col}21", money(margherita_ing_total[idx]))
        set_number(sheet3, f"{col}22", money(margherita_waste[idx]))
        set_number(sheet3, f"{col}23", money(pepperoni_ing_total[idx]))
        set_number(sheet3, f"{col}24", money(pepperoni_waste[idx]))
        set_number(sheet3, f"{col}25", money(mushrooms_ing_total[idx]))
        set_number(sheet3, f"{col}26", money(mushrooms_waste[idx]))
        set_number(sheet3, f"{col}28", money(packaging[idx]))
        set_number(sheet3, f"{col}29", money(utilities[idx]))
        set_number(sheet3, f"{col}30", money(amortization[idx]))
        set_number(sheet3, f"{col}31", money(total_cogs[idx]))
        set_number(sheet3, f"{col}33", money(gross_margin[idx]))
        set_number(sheet3, f"{col}34", ratio(margin_ratio[idx]))
        set_number(sheet3, f"{col}38", money(logistics[idx]))
        set_number(sheet3, f"{col}39", money(marketing[idx]))
        set_number(sheet3, f"{col}40", money(subscriptions[idx]))
        set_number(sheet3, f"{col}41", money(misc[idx]))
        set_number(sheet3, f"{col}44", money(helper_salary[idx]))
        set_number(sheet3, f"{col}45", money(founder_salary[idx]))
        set_number(sheet3, f"{col}46", money(payroll_taxes[idx]))
        set_number(sheet3, f"{col}47", money(payroll_total[idx]))
        set_number(sheet3, f"{col}51", money(total_fixed[idx]))
        set_number(sheet3, f"{col}53", money(ebitda[idx]))
        set_number(sheet3, f"{col}56", integer(taxes[idx]))
        set_number(sheet3, f"{col}58", integer(taxes[idx]))
        set_number(sheet3, f"{col}60", money(net_profit[idx]))
        set_number(sheet3, f"{col}61", ratio(net_margin_ratio[idx]))
        set_number(sheet3, f"{col}63", integer(cumulative_profit[idx]))

    totals_sheet3 = {
        "N14": sum([qty * price_b2b for qty in margherita_qty], Decimal("0")),
        "N15": sum([qty * price_b2b for qty in pepperoni_qty], Decimal("0")),
        "N16": sum([qty * price_b2b for qty in mushrooms_qty], Decimal("0")),
        "N17": sum(revenues, Decimal("0")),
        "N21": sum(margherita_ing_total, Decimal("0")),
        "N22": sum(margherita_waste, Decimal("0")),
        "N23": sum(pepperoni_ing_total, Decimal("0")),
        "N24": sum(pepperoni_waste, Decimal("0")),
        "N25": sum(mushrooms_ing_total, Decimal("0")),
        "N26": sum(mushrooms_waste, Decimal("0")),
        "N28": sum(packaging, Decimal("0")),
        "N29": sum(utilities, Decimal("0")),
        "N30": sum(amortization, Decimal("0")),
        "N31": sum(total_cogs, Decimal("0")),
        "N33": sum(gross_margin, Decimal("0")),
        "N38": sum(logistics, Decimal("0")),
        "N39": sum(marketing, Decimal("0")),
        "N40": sum(subscriptions, Decimal("0")),
        "N41": sum(misc, Decimal("0")),
        "N44": sum(helper_salary, Decimal("0")),
        "N45": sum(founder_salary, Decimal("0")),
        "N46": sum(payroll_taxes, Decimal("0")),
        "N47": sum(payroll_total, Decimal("0")),
        "N51": sum(total_fixed, Decimal("0")),
        "N53": sum(ebitda, Decimal("0")),
        "N56": sum(taxes, Decimal("0")),
        "N58": sum(taxes, Decimal("0")),
        "N60": sum(net_profit, Decimal("0")),
        "N63": cumulative_profit[-1],
    }
    for ref, value in totals_sheet3.items():
        set_number(sheet3, ref, money(value) if ref not in {"N56", "N58", "N63"} else integer(value))
    set_number(sheet3, "N34", ratio(sum(gross_margin, Decimal("0")) / sum(revenues, Decimal("0"))))
    set_number(sheet3, "N61", ratio(sum(net_profit, Decimal("0")) / sum(revenues, Decimal("0"))))

    set_text(
        sheet3,
        shared_root,
        "A2",
        "✦ Старт с 5 клиентов | доставка 450 руб./поставка (~4,3 поставки в месяц) | помощник при 10 кл. | заказ растёт до 25 пицц/нед. с мес.6 | аренды нет",
    )
    set_text(sheet3, shared_root, "A38", "Логистика (450 руб. × 4,3 поставки × кол-во клиентов)")

    # Sheet 4: cash flow
    receipts = monthly_receipts(revenues)
    quarter_taxes = [Decimal("0")] * 12
    quarter_taxes[3] = sum(taxes[:3], Decimal("0"))
    quarter_taxes[6] = sum(taxes[3:6], Decimal("0"))
    quarter_taxes[9] = sum(taxes[6:9], Decimal("0"))
    quarter_taxes[11] = sum(taxes[9:12], Decimal("0"))
    total_payouts = [
        total_cogs[i] + total_fixed[i] + quarter_taxes[i] for i in range(12)
    ]
    cash_flow = [receipts[i] - total_payouts[i] for i in range(12)]
    balances: list[Decimal] = []
    balance = Decimal("180000")
    for value in cash_flow:
        balance += value
        balances.append(balance)
    reserves = [
        Decimal("30000"),
        Decimal("30000"),
        Decimal("30000"),
        Decimal("40000"),
        Decimal("40000"),
        Decimal("70000"),
        Decimal("70000"),
        Decimal("70000"),
        Decimal("70000"),
        Decimal("70000"),
        Decimal("70000"),
        Decimal("70000"),
    ]
    headroom = [balances[i] - reserves[i] for i in range(12)]

    for idx, col in enumerate("CDEFGHIJKLMN", start=0):
        set_number(sheet4, f"{col}13", money(receipts[idx]))
        set_number(sheet4, f"{col}15", money(receipts[idx]))
        set_number(sheet4, f"{col}21", money(total_cogs[idx]))
        set_number(sheet4, f"{col}24", money(logistics[idx]))
        set_number(sheet4, f"{col}25", money(marketing[idx]))
        set_number(sheet4, f"{col}26", money(subscriptions[idx]))
        set_number(sheet4, f"{col}27", money(misc[idx]))
        set_number(sheet4, f"{col}28", money(helper_salary[idx]))
        set_number(sheet4, f"{col}29", money(founder_salary[idx]))
        set_number(sheet4, f"{col}30", money(payroll_taxes[idx]))
        set_number(sheet4, f"{col}31", money(total_fixed[idx]))
        set_number(sheet4, f"{col}34", integer(quarter_taxes[idx]))
        set_number(sheet4, f"{col}35", integer(quarter_taxes[idx]))
        set_number(sheet4, f"{col}37", money(total_payouts[idx]))
        set_number(sheet4, f"{col}39", money(cash_flow[idx]))
        set_number(sheet4, f"{col}42", money(balances[idx]))
        set_number(sheet4, f"{col}43", money(reserves[idx]))
        set_number(sheet4, f"{col}44", money(headroom[idx]))
        set_number(sheet4, f"{col}48", money(revenues[idx]))
        set_number(sheet4, f"{col}49", integer(net_profit[idx]))
        set_number(sheet4, f"{col}50", money(cash_flow[idx]))
        set_number(sheet4, f"{col}51", money(balances[idx]))

    totals_sheet4 = {
        "O13": sum(receipts, Decimal("0")),
        "O15": Decimal("350000") + sum(receipts, Decimal("0")),
        "O21": sum(total_cogs, Decimal("0")),
        "O24": sum(logistics, Decimal("0")),
        "O25": sum(marketing, Decimal("0")),
        "O26": sum(subscriptions, Decimal("0")),
        "O27": sum(misc, Decimal("0")),
        "O28": sum(helper_salary, Decimal("0")),
        "O29": sum(founder_salary, Decimal("0")),
        "O30": sum(payroll_taxes, Decimal("0")),
        "O31": sum(total_fixed, Decimal("0")),
        "O34": sum(quarter_taxes, Decimal("0")),
        "O35": sum(quarter_taxes, Decimal("0")),
        "O37": Decimal("170000") + sum(total_payouts, Decimal("0")),
        "O39": Decimal("180000") + sum(cash_flow, Decimal("0")),
        "O42": balances[-1],
        "O48": sum(revenues, Decimal("0")),
        "O49": sum(net_profit, Decimal("0")),
        "O50": Decimal("180000") + sum(cash_flow, Decimal("0")),
        "O51": balances[-1],
    }
    for ref, value in totals_sheet4.items():
        if ref in {"O34", "O35", "O49"}:
            set_number(sheet4, ref, integer(value))
        else:
            set_number(sheet4, ref, money(value))
    set_number(sheet4, "O44", money(headroom[-1]))

    set_text(sheet4, shared_root, "A24", "Логистика (450 руб. × 4,3 поставки × клиентов)")

    # workbook recalc hint
    workbook = load_xml(contents, "xl/workbook.xml")
    calc_pr = workbook.find("m:calcPr", NS)
    if calc_pr is None:
        calc_pr = ET.SubElement(workbook, qname("calcPr"))
    calc_pr.set("calcMode", "auto")
    calc_pr.set("fullCalcOnLoad", "1")
    calc_pr.set("forceFullCalc", "1")

    save_xml(contents, "xl/sharedStrings.xml", shared_root)
    save_xml(contents, "xl/worksheets/sheet1.xml", sheet1)
    save_xml(contents, "xl/worksheets/sheet2.xml", sheet2)
    save_xml(contents, "xl/worksheets/sheet3.xml", sheet3)
    save_xml(contents, "xl/worksheets/sheet4.xml", sheet4)
    save_xml(contents, "xl/workbook.xml", workbook)

    with zipfile.ZipFile(WORKBOOK_PATH, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for name, data in contents.items():
            zf.writestr(name, data)


if __name__ == "__main__":
    main()
