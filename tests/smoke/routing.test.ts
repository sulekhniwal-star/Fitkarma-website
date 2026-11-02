import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { isValidLocale, LOCALES, DEFAULT_LOCALE } from "../../src/i18n/config";
import { getMessages } from "../../src/i18n/get-messages";
import { env } from "../../src/lib/env";

describe("Phase 1: Routing & i18n Smoke Suite", () => {
  test("Locale validation detects valid and invalid locales", () => {
    assert.equal(isValidLocale("en"), true);
    assert.equal(isValidLocale("hi"), true);
    assert.equal(isValidLocale("fr"), false);
    assert.equal(isValidLocale("de"), false);
    assert.equal(isValidLocale(""), false);
    assert.equal(isValidLocale(null), false);
    assert.equal(isValidLocale(undefined), false);
    assert.equal(DEFAULT_LOCALE, "en");
    assert.deepEqual(LOCALES, ["en", "hi"]);
  });

  test("Message catalogs are complete for both English and Hindi", () => {
    const en = getMessages("en");
    const hi = getMessages("hi");

    assert.ok(en.brand.name === "FitKarma");
    assert.ok(hi.brand.name === "FitKarma");

    assert.ok(en.brand.tagline.includes("Fitness and Wellness Ecosystem"));
    assert.ok(hi.brand.tagline.includes("भारत का AI-संचालित"));

    assert.ok(en.hero.primaryCta.length > 0);
    assert.ok(hi.hero.primaryCta.length > 0);

    assert.ok(en.footer.tagline.length > 0);
    assert.ok(hi.footer.tagline.length > 0);

    // Verify key symmetry across catalogs
    assert.deepEqual(Object.keys(en), Object.keys(hi));
    assert.deepEqual(Object.keys(en.hero), Object.keys(hi.hero));
    assert.deepEqual(Object.keys(en.nav), Object.keys(hi.nav));
    assert.deepEqual(Object.keys(en.bento.cards), Object.keys(hi.bento.cards));
  });

  test("Environment schema parses default variables safely", () => {
    assert.ok(env.NEXT_PUBLIC_APP_URL);
    assert.ok(env.NEXT_PUBLIC_SUPABASE_URL);
    assert.ok(env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    assert.ok(env.ADMIN_EMAIL_ALLOWLIST.includes("sulekhniwal@gmail.com"));
    assert.equal(env.EMAIL_DEV_SINK, true);
  });
});
