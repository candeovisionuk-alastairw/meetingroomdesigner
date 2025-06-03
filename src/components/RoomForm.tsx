'use client';

import { useRoomStore } from '@/lib/store';
import { RoomConfig } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export default function RoomForm() {
  const { config, updateConfig, reset } = useRoomStore();

  const handleDimensionChange = (
    field: keyof RoomConfig['dimensions'],
    value: number
  ) => {
    if (isNaN(value) || value < 0.1 || value > 20) {
      console.warn(`Invalid value for ${field}: ${value}`);
      return;
    }
    updateConfig({
      dimensions: { ...config.dimensions, [field]: value },
    });
  };

  const handleTableChange = (
    field: keyof RoomConfig['table'],
    value: string | number
  ) => {
    updateConfig({
      table: { ...config.table, [field]: value },
    });
  };

  const handleEquipmentChange = (
    field: keyof RoomConfig['equipment'],
    checked: boolean
  ) => {
    updateConfig({
      equipment: { ...config.equipment, [field]: checked },
    });
  };

  const handleWallStyleChange = (
    field: keyof RoomConfig['wallStyle'],
    value: string | boolean | number
  ) => {
    updateConfig({
      wallStyle: { ...config.wallStyle, [field]: value },
    });
  };

  return (
    <form className="flex flex-col gap-8">
      {/* Room Dimensions */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Room Dimensions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['width', 'depth', 'height'] as const).map((field) => (
            <div key={field}>
              <Label htmlFor={field} className="capitalize">
                {field} (m)
              </Label>
              <Input
                type="number"
                step="0.1"
                min={1}
                id={field}
                value={config.dimensions[field]}
                onChange={(e) =>
                  handleDimensionChange(field, parseFloat(e.target.value))
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Wall Appearance */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Wall Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="color">Wall Color</Label>
            <Input
              id="color"
              type="color"
              value={config.wallStyle.color}
              onChange={(e) =>
                handleWallStyleChange('color', e.target.value)
              }
            />
          </div>

          <div>
            <Label htmlFor="thickness">Wall Thickness (m)</Label>
            <Input
              id="thickness"
              type="number"
              step="0.01"
              min={0.01}
              max={0.5}
              value={config.wallStyle.thickness}
              onChange={(e) =>
                handleWallStyleChange('thickness', parseFloat(e.target.value))
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="autoHide"
              checked={config.wallStyle.autoHide}
              onCheckedChange={(checked) =>
                handleWallStyleChange('autoHide', !!checked)
              }
            />
            <Label htmlFor="autoHide">Auto Hide Walls</Label>
          </div>
        </div>
      </section>

      {/* Table Configuration */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Table Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shape">Shape</Label>
            <Select
              value={config.table.shape}
              onValueChange={(value) => handleTableChange('shape', value)}
            >
              <SelectTrigger id="shape">
                <SelectValue placeholder="Select shape" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="oval">Oval</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="seats">Number of Seats</Label>
            <Input
              id="seats"
              type="number"
              min={1}
              value={config.table.seats}
              onChange={(e) =>
                handleTableChange('seats', parseInt(e.target.value))
              }
            />
          </div>

          <div>
            <Label htmlFor="width">Table Width (m)</Label>
            <Input
              id="width"
              type="number"
              step="0.1"
              value={config.table.width}
              onChange={(e) =>
                handleTableChange('width', parseFloat(e.target.value))
              }
            />
          </div>

          <div>
            <Label htmlFor="depth">Table Depth (m)</Label>
            <Input
              id="depth"
              type="number"
              step="0.1"
              value={config.table.depth}
              onChange={(e) =>
                handleTableChange('depth', parseFloat(e.target.value))
              }
            />
          </div>
        </div>
      </section>

      {/* Equipment Options */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Room Equipment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(config.equipment).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={(checked) =>
                  handleEquipmentChange(
                    key as keyof RoomConfig['equipment'],
                    !!checked
                  )
                }
              />
              <Label htmlFor={key} className="capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </Label>
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <section className="pt-2">
        <Button type="button" variant="outline" onClick={reset}>
          Reset to Defaults
        </Button>
      </section>
    </form>
  );
}
