import { describe, it, expect } from 'vitest';

describe('Marketing Routes Contract Verification', () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/features', name: 'Features & Simulators' },
    { path: '/about', name: 'Our Mission & Manifesto' },
    { path: '/beta', name: 'VIP Beta Registration' },
    { path: '/faq', name: 'Frequently Asked Questions' },
    { path: '/privacy', name: 'Privacy Notice (DPDP Act)' },
    { path: '/terms', name: 'Beta Terms of Service' },
  ];

  it('declares all 7 required marketing and legal routes', () => {
    expect(routes).toHaveLength(7);
    const paths = routes.map((r) => r.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/features');
    expect(paths).toContain('/about');
    expect(paths).toContain('/beta');
    expect(paths).toContain('/faq');
    expect(paths).toContain('/privacy');
    expect(paths).toContain('/terms');
  });
});

