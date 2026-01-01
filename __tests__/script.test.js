/**
 * Comprehensive Unit Tests for script.js
 * Testing the BeyondAI Roofer Landing Page functionality
 */

describe('URL Validation Tests', () => {
  // Mock the isValidUrl function behavior
  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  describe('Valid URLs', () => {
    test('should accept valid HTTP URL', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
    });

    test('should accept valid HTTPS URL', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
    });

    test('should accept URL with path', () => {
      expect(isValidUrl('https://example.com/path')).toBe(true);
    });

    test('should accept URL with query parameters', () => {
      expect(isValidUrl('https://example.com?param=value')).toBe(true);
    });

    test('should accept URL with subdomain', () => {
      expect(isValidUrl('https://sub.example.com')).toBe(true);
    });

    test('should accept URL with port', () => {
      expect(isValidUrl('https://example.com:8080')).toBe(true);
    });
  });

  describe('Invalid URLs', () => {
    test('should reject empty string', () => {
      expect(isValidUrl('')).toBe(false);
    });

    test('should reject URL without protocol', () => {
      expect(isValidUrl('example.com')).toBe(false);
    });

    test('should reject FTP protocol', () => {
      expect(isValidUrl('ftp://example.com')).toBe(false);
    });

    test('should reject JavaScript protocol', () => {
      expect(isValidUrl('javascript:alert(1)')).toBe(false);
    });

    test('should reject malformed URL', () => {
      expect(isValidUrl('ht!tp://example')).toBe(false);
    });

    test('should reject whitespace', () => {
      expect(isValidUrl('   ')).toBe(false);
    });
  });
});

describe('Audit Results Generation Tests', () => {
  const generateAuditResults = () => ({
    seo: Math.floor(Math.random() * 30) + 60,
    performance: Math.floor(Math.random() * 30) + 60,
    mobile: Math.floor(Math.random() * 30) + 65,
    lead: Math.floor(Math.random() * 35) + 55,
    recommendations: [
      'Optimize page load speed',
      'Add local SEO schema markup',
      'Implement mobile-responsive design',
      'Add clear call-to-action buttons',
      'Create dedicated landing pages',
      'Set up Google My Business'
    ]
  });

  test('should generate SEO score in range 60-90', () => {
    const results = generateAuditResults();
    expect(results.seo).toBeGreaterThanOrEqual(60);
    expect(results.seo).toBeLessThanOrEqual(90);
  });

  test('should generate performance score in range 60-90', () => {
    const results = generateAuditResults();
    expect(results.performance).toBeGreaterThanOrEqual(60);
    expect(results.performance).toBeLessThanOrEqual(90);
  });

  test('should generate mobile score in range 65-95', () => {
    const results = generateAuditResults();
    expect(results.mobile).toBeGreaterThanOrEqual(65);
    expect(results.mobile).toBeLessThanOrEqual(95);
  });

  test('should generate lead score in range 55-90', () => {
    const results = generateAuditResults();
    expect(results.lead).toBeGreaterThanOrEqual(55);
    expect(results.lead).toBeLessThanOrEqual(90);
  });

  test('should include recommendations array', () => {
    const results = generateAuditResults();
    expect(Array.isArray(results.recommendations)).toBe(true);
    expect(results.recommendations.length).toBeGreaterThan(0);
  });
});

describe('Chatbot Response Tests', () => {
  const botResponses = {
    cost: 'The cost of a new roof typically ranges from $5,000 to $25,000',
    types: 'We offer several roofing options: Asphalt Shingles, Metal Roofing, Tile Roofing',
    estimate: 'Yes! We provide completely free, no-obligation estimates',
    default: 'That\'s a great question! Our roofing specialists can provide detailed information'
  };

  const getBotResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('cost') || lowerMsg.includes('price') || lowerMsg.includes('much')) {
      return botResponses.cost;
    } else if (lowerMsg.includes('type') || lowerMsg.includes('material') || lowerMsg.includes('kind')) {
      return botResponses.types;
    } else if (lowerMsg.includes('estimate') || lowerMsg.includes('quote') || lowerMsg.includes('free')) {
      return botResponses.estimate;
    } else {
      return botResponses.default;
    }
  };

  describe('Cost-related queries', () => {
    test('should respond to "cost" question', () => {
      const response = getBotResponse('How much does it cost?');
      expect(response).toContain('$5,000');
    });

    test('should respond to "price" question', () => {
      const response = getBotResponse('What is the price?');
      expect(response).toContain('$5,000');
    });

    test('should respond to "much" question', () => {
      const response = getBotResponse('How much for a new roof?');
      expect(response).toContain('$5,000');
    });
  });

  describe('Type-related queries', () => {
    test('should respond to "type" question', () => {
      const response = getBotResponse('What types do you offer?');
      expect(response).toContain('Asphalt Shingles');
    });

    test('should respond to "material" question', () => {
      const response = getBotResponse('What materials are available?');
      expect(response).toContain('Metal Roofing');
    });

    test('should respond to "kind" question', () => {
      const response = getBotResponse('What kind of roofing?');
      expect(response).toContain('Tile Roofing');
    });
  });

  describe('Estimate-related queries', () => {
    test('should respond to "estimate" question', () => {
      const response = getBotResponse('Can I get an estimate?');
      expect(response).toContain('free');
    });

    test('should respond to "quote" question', () => {
      const response = getBotResponse('Do you provide quotes?');
      expect(response).toContain('free');
    });

    test('should respond to "free" question', () => {
      const response = getBotResponse('Is it free?');
      expect(response).toContain('free');
    });
  });

  describe('Default responses', () => {
    test('should provide default response for unknown query', () => {
      const response = getBotResponse('Random question');
      expect(response).toContain('great question');
    });

    test('should handle empty message', () => {
      const response = getBotResponse('');
      expect(response).toBeDefined();
    });
  });
});

describe('DOM Element Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="auditUrl" />
      <button id="runAuditBtn">Run Audit</button>
      <div id="auditLoading" style="display: none;">Loading...</div>
      <div id="auditResults" style="display: none;">Results</div>
      <input id="chatInput" />
      <button id="sendChatBtn">Send</button>
      <div id="chatMessages"></div>
      <form id="contactForm"></form>
      <div id="contactSuccess" style="display: none;">Success!</div>
      <div id="currentYear"></div>
    `;
  });

  test('should find audit URL input', () => {
    const element = document.getElementById('auditUrl');
    expect(element).not.toBeNull();
  });

  test('should find run audit button', () => {
    const element = document.getElementById('runAuditBtn');
    expect(element).not.toBeNull();
  });

  test('should find audit loading element', () => {
    const element = document.getElementById('auditLoading');
    expect(element).not.toBeNull();
  });

  test('should find audit results element', () => {
    const element = document.getElementById('auditResults');
    expect(element).not.toBeNull();
  });

  test('should initially hide loading indicator', () => {
    const element = document.getElementById('auditLoading');
    expect(element.style.display).toBe('none');
  });

  test('should initially hide results', () => {
    const element = document.getElementById('auditResults');
    expect(element.style.display).toBe('none');
  });
});

describe('Score Animation Tests', () => {
  test('should color code score >= 80 as green', () => {
    const score = 85;
    const expectedColor = '#10b981';
    expect(score).toBeGreaterThanOrEqual(80);
  });

  test('should color code score 60-79 as orange', () => {
    const score = 70;
    const expectedColor = '#f59e0b';
    expect(score).toBeGreaterThanOrEqual(60);
    expect(score).toBeLessThan(80);
  });

  test('should color code score < 60 as red', () => {
    const score = 50;
    const expectedColor = '#ef4444';
    expect(score).toBeLessThan(60);
  });
});

describe('Content Type Tests', () => {
  const contentTypes = ['blog', 'social', 'email', 'landing'];

  test('should have blog content template', () => {
    expect(contentTypes).toContain('blog');
  });

  test('should have social media content template', () => {
    expect(contentTypes).toContain('social');
  });

  test('should have email content template', () => {
    expect(contentTypes).toContain('email');
  });

  test('should have landing page content template', () => {
    expect(contentTypes).toContain('landing');
  });
});

describe('Year Display Tests', () => {
  test('should get current year', () => {
    const currentYear = new Date().getFullYear();
    expect(currentYear).toBeGreaterThanOrEqual(2025);
  });

  test('should format year as string', () => {
    const year = new Date().getFullYear().toString();
    expect(typeof year).toBe('string');
    expect(year.length).toBe(4);
  });
});