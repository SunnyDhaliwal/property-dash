import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PropertyForm } from "@/components/properties/property-form";

describe("PropertyForm", () => {
  it("has accessible labels and a single submit control", () => {
    render(
      <PropertyForm
        action={vi.fn().mockResolvedValue({})}
        submitLabel="Create property"
      />,
    );
    expect(screen.getByLabelText(/Display name/)).toBeRequired();
    expect(
      screen.getAllByRole("button", { name: "Create property" }),
    ).toHaveLength(1);
  });
});
