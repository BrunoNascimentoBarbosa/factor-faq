import { FileText, BarChart3, Ruler, DollarSign, Grid3x3 } from 'lucide-react';
import { CATEGORIES } from '@/utils/constants';

const CATEGORY_ICONS = {
  cadastro: FileText,
  monitoramento: BarChart3,
  medicao: Ruler,
  financeiro: DollarSign,
};

export const CategoryFilter = ({ selected, onSelect, counts = {} }) => {
  return (
    <aside className="w-64 bg-white rounded-lg shadow-md p-4 sticky top-4 h-fit">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Categorias</h2>

      <button
        onClick={() => onSelect(null)}
        className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
          !selected
            ? 'bg-primary text-white'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <Grid3x3 className="w-5 h-5" />
        <span className="flex-1 font-medium">Todas as categorias</span>
      </button>

      {CATEGORIES.map(({ id, name }) => {
        const Icon = CATEGORY_ICONS[id];
        const count = counts[id] !== undefined ? counts[id] : 0;

        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
              selected === id
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="flex-1 font-medium">{name}</span>
            <span className={`text-sm px-2 py-1 rounded-full font-semibold ${
              selected === id ? 'bg-white text-primary' : 'bg-gray-200 text-gray-600'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </aside>
  );
};
