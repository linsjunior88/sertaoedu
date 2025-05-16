import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';

// Dados fictícios para o gráfico de barras (Desempenho por Disciplina/Atividade)
const barChartData = [
  { name: 'Matemática', desempenho: 75, pv: 2400, amt: 2400 },
  { name: 'Português', desempenho: 88, pv: 1398, amt: 2210 },
  { name: 'Ciências', desempenho: 60, pv: 9800, amt: 2290 },
  { name: 'História', desempenho: 92, pv: 3908, amt: 2000 },
  { name: 'Geografia', desempenho: 70, pv: 4800, amt: 2181 },
];

// Dados fictícios para o gráfico de pizza (Níveis de Desempenho da Turma)
const pieChartData = [
  { name: 'Alto (>=81%)', value: 12, color: '#4CAF50' }, // Verde
  { name: 'Médio (50-80%)', value: 8, color: '#FFC107' }, // Amarelo
  { name: 'Baixo (<50%)', value: 5, color: '#F44336' },   // Vermelho
];

// Custom Active Shape for Pie Chart (Optional, for better interaction)
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={16} fontWeight="bold">
        {payload.name.split(' ')[0]} {/* Show only first word e.g., Alto, Médio, Baixo */}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={12}>{`${value} Alunos`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={11}>
        {`(Taxa: ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export function PerformanceChartCard() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Desempenho Geral da Turma</h3>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Gráfico de Barras */}
        <div className="lg:col-span-3 h-80 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium text-gray-700 mb-3 text-center">Desempenho Médio por Área</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip wrapperStyle={{ fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="desempenho" fill="#8884d8" barSize={30} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pizza */}
        <div className="lg:col-span-2 h-80 bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
          <h4 className="text-md font-medium text-gray-700 mb-1 text-center">Distribuição de Níveis</h4>
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={50} // Ajustado para melhor visualização
                outerRadius={70} // Ajustado para melhor visualização
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* <Legend wrapperStyle={{ fontSize: '11px', marginTop: '10px' }} layout="vertical" align="center" verticalAlign="bottom" /> */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

