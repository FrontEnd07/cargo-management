import React, { memo } from 'react';
import { TotalStats } from '5_entities/receive-products';

interface StatisticsPanelProps {
    stats: TotalStats;
}

export const StatisticsPanel = memo<StatisticsPanelProps>(({ stats }) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2 dark:text-gray-300">Общая статистика:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-100 p-3 rounded">
                    <div className="font-medium text-blue-900">Общий объем</div>
                    <div className="text-lg font-bold text-blue-700">{stats.totalVolume} м³</div>
                </div>
                <div className="bg-green-100 p-3 rounded">
                    <div className="font-medium text-green-900">Общий вес</div>
                    <div className="text-lg font-bold text-green-700">{stats.totalWeight} кг</div>
                </div>
                <div className="bg-purple-100 p-3 rounded">
                    <div className="font-medium text-purple-900">Среднее соотношение</div>
                    <div className="text-lg font-bold text-purple-700">{stats.avgRatio}</div>
                </div>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    // Сравниваем только значения stats
    return (
        prevProps.stats.totalVolume === nextProps.stats.totalVolume &&
        prevProps.stats.totalWeight === nextProps.stats.totalWeight &&
        prevProps.stats.avgRatio === nextProps.stats.avgRatio
    );
});

StatisticsPanel.displayName = 'StatisticsPanel';