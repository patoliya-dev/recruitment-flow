import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BrandColorPicker = ({ selectedColor, onColorChange }) => {
  const [customColor, setCustomColor] = useState(selectedColor || '#2C5F41');

  const presetColors = [
    { name: 'Forest Green', value: '#2C5F41' },
    { name: 'Ocean Blue', value: '#2563EB' },
    { name: 'Sunset Orange', value: '#EA580C' },
    { name: 'Royal Purple', value: '#7C3AED' },
    { name: 'Ruby Red', value: '#DC2626' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Amber', value: '#D97706' },
    { name: 'Pink', value: '#DB2777' },
    { name: 'Teal', value: '#0D9488' },
    { name: 'Indigo', value: '#4F46E5' },
    { name: 'Slate', value: '#475569' },
    { name: 'Coral', value: '#E85A4F' }
  ];

  const handlePresetClick = (color) => {
    setCustomColor(color);
    onColorChange(color);
  };

  const handleCustomColorChange = (e) => {
    const newColor = e?.target?.value;
    setCustomColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm md:text-base font-medium text-foreground mb-3">
          Choose from presets
        </h4>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3">
          {presetColors?.map((color) => (
            <button
              key={color?.value}
              onClick={() => handlePresetClick(color?.value)}
              className="group relative aspect-square rounded-lg transition-smooth hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              style={{ backgroundColor: color?.value }}
              aria-label={`Select ${color?.name} as brand color`}
            >
              {selectedColor === color?.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-warm-md">
                    <Icon name="Check" size={16} color={color?.value} />
                  </div>
                </div>
              )}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none">
                <span className="text-xs text-caption text-muted-foreground whitespace-nowrap bg-card px-2 py-1 rounded shadow-warm-sm">
                  {color?.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm md:text-base font-medium text-foreground mb-3">
          Or use custom color
        </h4>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Select custom brand color"
            />
            <div className="flex items-center gap-3 p-4 border-2 border-border rounded-lg hover:border-primary transition-smooth cursor-pointer">
              <div
                className="w-12 h-12 rounded-md border-2 border-border flex-shrink-0"
                style={{ backgroundColor: customColor }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Custom Color</p>
                <p className="text-xs text-caption text-muted-foreground font-data">
                  {customColor?.toUpperCase()}
                </p>
              </div>
              <Icon name="Pipette" size={20} color="var(--color-muted-foreground)" />
            </div>
          </div>

          <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
            <Icon name="Info" size={18} color="var(--color-muted-foreground)" />
            <p className="text-xs text-caption text-muted-foreground">
              This color will be used for buttons and accents
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Color Best Practices</p>
            <ul className="text-xs text-caption text-muted-foreground space-y-1">
              <li>• Choose colors that align with your brand identity</li>
              <li>• Ensure sufficient contrast for readability</li>
              <li>• Consider color psychology in recruitment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandColorPicker;