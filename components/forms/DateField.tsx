'use client';

import { useRef, useMemo } from 'react';

function formatJP(dateStr: string) {
    // dateStr = "2026-01-01"
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${y}/${Number(m)}/${Number(d)}`;
}

interface DateFieldProps {
    label: string;
    required?: boolean;
    value: string; // "YYYY-MM-DD"
    onChange: (v: string) => void;
    name: string;
}

export function DateField({
    label,
    required,
    value,
    onChange,
    name,
}: DateFieldProps) {
    const ref = useRef<HTMLInputElement>(null);

    const display = useMemo(() => {
        return value ? formatJP(value) : '日付を選択してください';
    }, [value]);

    const handleClick = () => {
        if (ref.current) {
            // showPicker()が使えればそれを使う、なければfocus()
            if ('showPicker' in ref.current && typeof ref.current.showPicker === 'function') {
                try {
                    ref.current.showPicker();
                } catch {
                    ref.current.focus();
                }
            } else {
                ref.current.focus();
            }
        }
    };

    return (
        <div className="w-full">
            {/* ここが肝：overflow-hidden + relative */}
            <div
                className="relative w-full overflow-hidden rounded-lg border-2 border-navy-200 bg-white transition-colors hover:border-navy-300 focus-within:border-navy-600"
                onClick={handleClick}
            >
                {/* 表示用（これが見える） */}
                <div className={`px-4 py-3 text-sm ${value ? 'text-navy-800' : 'text-gray-400'}`}>
                    {display}
                </div>

                {/* 本物の date input（透明・absolute でレイアウトに影響させない） */}
                <input
                    ref={ref}
                    type="date"
                    lang="en"
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
            </div>
        </div>
    );
}
