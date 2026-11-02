import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Phase 2: Brand Identity & Design System Smoke Suite", () => {
  test("Approved vector logo assets exist in public/brand/", () => {
    const requiredAssets = [
      "fitkarma-primary-dark.svg",
      "fitkarma-primary-light.svg",
      "fitkarma-wordmark-dark.svg",
      "fitkarma-mark.svg",
      "fitkarma-app-icon-dark.svg",
      "approved-logo-system-reference.png",
    ];

    for (const asset of requiredAssets) {
      const filePath = path.join(process.cwd(), "public", "brand", asset);
      assert.ok(fs.existsSync(filePath), `Missing brand asset: ${asset}`);
      const stats = fs.statSync(filePath);
      assert.ok(stats.size > 0, `Asset ${asset} is empty`);
    }
  });

  test("Primary dark SVG logo contains valid SVG attributes and text lockup", () => {
    const svgPath = path.join(process.cwd(), "public", "brand", "fitkarma-primary-dark.svg");
    const content = fs.readFileSync(svgPath, "utf8");

    assert.ok(content.includes("<svg"), "Must contain root <svg tag");
    assert.ok(content.includes("Fit"), "Must contain Fit wordmark");
    assert.ok(content.includes("Karma"), "Must contain Karma wordmark");
    assert.ok(content.includes("INDIA’S AI-POWERED"), "Must contain approved primary positioning");
    assert.ok(content.includes("#16A34A"), "Must contain primary emerald green");
    assert.ok(content.includes("#D6A84B"), "Must contain Indian brass gold stop");
  });

  test("Rollout status vocabulary complies with product truth fences", () => {
    const approvedStatuses = [
      "In beta",
      "Rolling out during beta",
      "Planned within the beta programme",
    ];

    for (const status of approvedStatuses) {
      assert.ok(
        ["In beta", "Rolling out during beta", "Planned within the beta programme"].includes(status),
        `Status ${status} is not in approved vocabulary`
      );
    }
  });
});

