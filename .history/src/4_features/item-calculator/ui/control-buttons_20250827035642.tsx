
import React from 'react';
import { Button } from '6_shared/ui';

interface ControlButtonsProps {
    itemsCount: number;
    onAddItem: () => void;
    onSubmit: () => void;
    onClearAll: () => void;
    isLoading?: boolean;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
    itemsCount,
    onAddItem,
    onSubmit,
    onClearAll,
    isLoading
}) => {
    return (
        <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="secondary" onClick={onAddItem}>
                + Добавить строку
            </Button>

            <Button onClick={onSubmit} isLoading={isLoading}>
                📊 Отправить данные
            </Button>

            {itemsCount > 1 && (
                <Button variant="danger" onClick={onClearAll}>
                    🗑️ Очистить все
                </Button>
            )}
        </div>
    );
};