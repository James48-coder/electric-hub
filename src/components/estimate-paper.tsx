type Item = {
  name: string;
  unit: string;
  qty: number;
  price: number;
};

// Это статичная заглушка. Она будет показываться до того, как ИИ сделает первый расчет.
const ITEMS: Item[] = [
  { name: "Монтаж розетки скрытой установки", unit: "шт", qty: 12, price: 350 },
  { name: "Монтаж выключателя одноклавишного", unit: "шт", qty: 6, price: 320 },
  { name: "Прокладка кабеля ВВГнг 3×2.5 в штробе", unit: "м", qty: 85, price: 180 },
  { name: "Штробление стен (кирпич)", unit: "м", qty: 60, price: 220 },
  { name: "Установка автоматического выключателя", unit: "шт", qty: 8, price: 450 },
  { name: "Сборка и подключение щита", unit: "шт", qty: 1, price: 4500 },
];

const fmt = (n: number) => n.toLocaleString("ru-RU");

type EstimatePaperProps = {
  region?: string;
  objectType?: string;
  // Добавляем возможность передать сюда данные от ИИ
  customItems?: Item[] | null; 
};

export function EstimatePaper({ region, objectType, customItems }: EstimatePaperProps = {}) {
  // МАГИЯ ЗДЕСЬ: Если нам передали customItems от ИИ - используем их. Иначе берем заглушку ITEMS.
  const activeItems = customItems && customItems.length > 0 ? customItems : ITEMS;
  
  // Считаем общую сумму по активному списку (либо ИИ, либо заглушке)
  const total = activeItems.reduce((s, i) => s + i.qty * i.price, 0);
  const today = new Date().toLocaleDateString("ru-RU");

  return (
    <div className="flex h-full w-full items-start justify-center">
      <div
        className="mx-auto w-full max-w-[820px] bg-white text-neutral-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45),0_10px_25px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
        style={{ minHeight: "1160px" }}
      >
        <div className="flex h-full flex-col p-4 sm:p-6 md:p-12">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-neutral-900 pb-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight md:text-3xl">
                Смета на электромонтажные работы
              </h1>
              <p className="mt-1 text-xs md:text-sm text-neutral-600">
                Объект: {objectType || "Не указан"} · Адрес: {region ? `г. ${region}` : "Не указан"}
              </p>
            </div>
            <div className="text-right text-[10px] md:text-xs text-neutral-600">
              <div>№ СМ-2026-001</div>
              <div>Дата: {today}</div>
            </div>
          </div>

          {/* Parties */}
          <div className="mt-5 grid grid-cols-2 gap-6 text-[10px] md:text-xs text-neutral-700">
            <div>
              <div className="font-semibold text-neutral-900">Исполнитель</div>
              <div>ВольтПро · ИНН 7700000000</div>
            </div>
            <div>
              <div className="font-semibold text-neutral-900">Заказчик</div>
              <div>Иванов И.И.</div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 mb-8 w-full overflow-x-auto overflow-y-hidden">
            <table className="w-full min-w-[500px] border-collapse text-xs md:text-sm md:min-w-0">
              <thead>
                <tr className="bg-neutral-100 text-left text-neutral-900">
                  <th className="border border-neutral-300 px-3 py-2">№</th>
                  <th className="border border-neutral-300 px-3 py-2">Наименование работ</th>
                  <th className="border border-neutral-300 px-3 py-2">Ед.</th>
                  <th className="border border-neutral-300 px-3 py-2 text-right">Кол-во</th>
                  <th className="border border-neutral-300 px-3 py-2 text-right">Цена, ₽</th>
                  <th className="border border-neutral-300 px-3 py-2 text-right">Сумма, ₽</th>
                </tr>
              </thead>
              <tbody>
                {activeItems.map((it, i) => (
                  <tr key={i} className="align-top">
                    <td className="border border-neutral-300 px-3 py-2 text-neutral-600">{i + 1}</td>
                    <td className="border border-neutral-300 px-3 py-2 break-words">{it.name}</td>
                    <td className="border border-neutral-300 px-3 py-2">{it.unit}</td>
                    <td className="border border-neutral-300 px-3 py-2 text-right tabular-nums">{it.qty}</td>
                    <td className="border border-neutral-300 px-3 py-2 text-right tabular-nums">{fmt(it.price)}</td>
                    <td className="border border-neutral-300 px-3 py-2 text-right tabular-nums">
                      {fmt(it.qty * it.price)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="border border-neutral-900 bg-neutral-100 px-3 py-3 text-right text-sm md:text-base font-bold">
                    Итого
                  </td>
                  <td className="border border-neutral-900 bg-neutral-100 px-3 py-3 text-right text-sm md:text-base font-bold tabular-nums">
                    {fmt(total)} ₽
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer: Text & Signatures grouped together at the bottom */}
          <div className="mt-auto">
            <p className="text-[10px] md:text-xs text-neutral-600">
              Расчёт является предварительным. Окончательная стоимость определяется после
              осмотра объекта и согласования объёма работ.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-10 text-[10px] md:text-xs text-neutral-700">
              <div>
                <div className="border-b border-neutral-400 pb-1">Исполнитель</div>
                <div className="mt-1 text-neutral-500">подпись / расшифровка</div>
              </div>
              <div>
                <div className="border-b border-neutral-400 pb-1">Заказчик</div>
                <div className="mt-1 text-neutral-500">подпись / расшифровка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
