"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SlideProps {
  value?: number;
  onChange?: (value: number) => void;
  onCommit?: () => void;
  max?: number;
  step?: number;
  defaultValue?: number;
}

function Slider({
  value = 0.5,
  onChange,
  onCommit,
  max = 1,
  step = 0.1,
  defaultValue = 0.5,
}: SlideProps) {
  function handleChange(newValue: number[]) {
    onChange?.(newValue[0]);
  }

  function handleCommit() {
    onCommit?.();
  }

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10 cursor-pointer"
      defaultValue={[defaultValue]}
      value={[value]}
      onValueChange={handleChange}
      onValueCommit={handleCommit}
      max={max}
      step={step}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-1">
        <RadixSlider.Range className="absolute bg-green-500 rounded-full h-full" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block w-3 h-3 rounded-full bg-white" />
    </RadixSlider.Root>
  );
}

export default Slider;
