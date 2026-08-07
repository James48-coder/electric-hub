import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Zap, TrendingDown } from 'lucide-react';

export default function VoltageDropCalculator() {
  const [voltage, setVoltage] = useState('220');
  const [material, setMaterial] = useState('copper');
  const [checkMode, setCheckMode] = useState(false); // Switch: true = проверка, false = подбор

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
        <TrendingDown className="w-6 h-6 text-blue-600" />
        Падение напряжения ($\Delta U$)
      </h2>

      <div className="space-y-6">
        {/* Режим расчета (Свитч) */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <Label htmlFor="check-mode" className="cursor-pointer font-medium">
            {checkMode ? "Проверка заданного сечения" : "Автоматический подбор"}
          </Label>
          <Switch id="check-mode" checked={checkMode} onCheckedChange={setCheckMode} />
        </div>

        {/* Выбор напряжения */}
        <div className="space-y-2">
          <Label>Напряжение сети (В)</Label>
          <Select value={voltage} onValueChange={setVoltage}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="220" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="220">220 В</SelectItem>
              <SelectItem value="380">380 В</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Выбор материала */}
        <div className="space-y-2">
          <Label>Материал жилы</Label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="Медь" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="copper">Медь</SelectItem>
              <SelectItem value="aluminum">Алюминий</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Поля для ввода данных */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Длина линии (м)</Label>
            <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="10" />
          </div>
          <div className="space-y-2">
            <Label>Мощность (кВт)</Label>
            <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="5.0" />
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" /> Рассчитать
        </button>
      </div>
    </div>
  );
}
