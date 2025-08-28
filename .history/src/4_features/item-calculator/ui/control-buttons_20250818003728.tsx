
import React from 'react';
import { Button } from '6_shared/ui';

interface ControlButtonsProps {
    itemsCount: number;
    onAddItem: () => void;
    onSubmit: () => void;
    onClearAll: () => void;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
    itemsCount,
    onAddItem,
    onSubmit,
    onClearAll
}) => {
    return (
        <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="secondary" onClick={onAddItem}>
                + Добавить строку
            </Button>

            <Button onClick={onSubmit}>
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