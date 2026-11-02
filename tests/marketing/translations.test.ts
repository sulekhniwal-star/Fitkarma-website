import { describe, it, expect } from 'vitest';
import en from '../../messages/en.json';
import hi from '../../messages/hi.json';

describe('Bilingual Translation Parity (en vs hi)', () => {
  const getNestedKeys = (obj: Record<string, any>, prefix = ''): string[] => {
    return Object.keys(obj).reduce((res: string[], el: string) => {
      const name = prefix ? `${prefix}.${el}` : el;
      if (typeof obj[el] === 'object' && obj[el] !== null && !Array.isArray(obj[el])) {
        res.push(...getNestedKeys(obj[el], name));
      } else {
        res.push(name);
      }
      return res;
    }, []);
  };

  const getNestedValue = (obj: Record<string, any>, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const enKeys = getNestedKeys(en);
  const hiKeys = getNestedKeys(hi);

  it('contains all required top-level marketing namespaces in both locales', () => {
    const requiredNamespaces = ['metadata', 'common', 'nav', 'hero', 'home', 'about', 'features', 'faq', 'privacy', 'terms', 'beta', 'footer'];
    for (const ns of requiredNamespaces) {
      expect((en as any)[ns], `en missing namespace ${ns}`).toBeDefined();
      expect((hi as any)[ns], `hi missing namespace ${ns}`).toBeDefined();
    }
  });

  it('guarantees every English key exists in Hindi with a non-empty string', () => {
    const missingInHi: string[] = [];
    const emptyInHi: string[] = [];

    for (const key of enKeys) {
      const hiVal = getNestedValue(hi, key);
      if (hiVal === undefined) {
        missingInHi.push(key);
      } else if (typeof hiVal === 'string' && hiVal.trim() === '') {
        emptyInHi.push(key);
      }
    }

    expect(missingInHi, `Keys present in en.json but missing in hi.json: ${missingInHi.join(', ')}`).toEqual([]);
    expect(emptyInHi, `Keys in hi.json that are empty strings: ${emptyInHi.join(', ')}`).toEqual([]);
  });

  it('strictly preserves the FitKarma brand name spelling', () => {
    expect(en.common.brandName).toBe('FitKarma');
    expect(hi.common.brandName).toBe('FitKarma');
  });
});

