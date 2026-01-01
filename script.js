// Live Audit Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Audit Tool
    const auditBtn = document.getElementById('runAuditBtn');
    const auditUrl = document.getElementById('auditUrl');
    const auditLoading = document.getElementById('auditLoading');
    const auditResults = document.getElementById('auditResults');

    if (auditBtn) {
        auditBtn.addEventListener('click', function() {
            const url = auditUrl.value.trim();
            
            if (!url) {
                alert('Please enter a website URL');
                return;
            }

            if (!isValidUrl(url)) {
                alert('Please enter a valid URL (e.g., https://example.com)');
                return;
            }

            runAudit(url);
        });
    }

    function isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch (_) {
            return false;
        }
    }

    function runAudit(url) {
        // Hide results and show loading
        auditResults.style.display = 'none';
        auditLoading.style.display = 'block';

        // Simulate audit process (in production, this would call a real API)
        setTimeout(function() {
            // Generate simulated results
            const results = generateAuditResults();
            
            // Display results
            displayAuditResults(results);
            
            // Hide loading and show results
            auditLoading.style.display = 'none';
            auditResults.style.display = 'block';

            // Smooth scroll to results
            auditResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 3000);
    }

    function generateAuditResults() {
        return {
            seo: Math.floor(Math.random() * 30) + 60, // 60-90
            performance: Math.floor(Math.random() * 30) + 60,
            mobile: Math.floor(Math.random() * 30) + 65,
            lead: Math.floor(Math.random() * 35) + 55,
            recommendations: [
                'Optimize page load speed by compressing images and enabling browser caching',
                'Add local SEO schema markup to improve search visibility for roofing services',
                'Implement mobile-responsive design to improve user experience on smartphones',
                'Add clear call-to-action buttons above the fold to increase lead capture',
                'Create dedicated landing pages for each roofing service you offer',
                'Set up Google My Business and optimize for local search results'
            ]
        };
    }

    function displayAuditResults(results) {
        // Animate score updates
        animateValue('seoScore', 0, results.seo, 1000);
        animateValue('performanceScore', 0, results.performance, 1000);
        animateValue('mobileScore', 0, results.mobile, 1000);
        animateValue('leadScore', 0, results.lead, 1000);

        // Display recommendations
        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = '';
        
        // Show random 4 recommendations
        const selectedRecs = results.recommendations
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
        
        selectedRecs.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
    }

    function animateValue(id, start, end, duration) {
        const element = document.getElementById(id);
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(function() {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '/100';
            
            // Color code the score
            const score = Math.floor(current);
            if (score >= 80) {
                element.style.color = '#10b981'; // green
            } else if (score >= 60) {
                element.style.color = '#f59e0b'; // orange
            } else {
                element.style.color = '#ef4444'; // red
            }
        }, 16);
    }

    // Demo Tabs
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const demoType = this.getAttribute('data-demo');
            
            // Remove active class from all tabs and panels
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById('demo-' + demoType).classList.add('active');
        });
    });

    // Chatbot Demo
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    const quickBtns = document.querySelectorAll('.quick-btn');

    const botResponses = {
        'cost': 'The cost of a new roof typically ranges from $5,000 to $25,000 depending on the size, materials, and complexity of your project. We offer free estimates! Would you like to schedule one?',
        'types': 'We offer several roofing options: Asphalt Shingles (most popular, affordable), Metal Roofing (durable, energy-efficient), Tile Roofing (long-lasting, elegant), and TPO/EPDM (commercial flat roofs). What type interests you?',
        'estimate': 'Yes! We provide completely free, no-obligation estimates. Our experts will inspect your roof, discuss your needs, and provide a detailed quote. Would you like to book an appointment?',
        'default': 'That\'s a great question! Our roofing specialists can provide detailed information about that. Would you like to schedule a free consultation to discuss your specific needs?'
    };

    function sendMessage(message) {
        if (!message.trim()) return;

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user-message';
        userMsg.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMsg);

        // Clear input
        chatInput.value = '';

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate bot response delay
        setTimeout(function() {
            const response = getBotResponse(message);
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot-message';
            botMsg.innerHTML = `<p>${response}</p>`;
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    function getBotResponse(message) {
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
    }

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', function() {
            sendMessage(chatInput.value);
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(chatInput.value);
            }
        });
    }

    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            sendMessage(question);
        });
    });

    // Lead Form Demo
    const demoLeadForm = document.getElementById('demoLeadForm');
    const leadSuccessMessage = document.getElementById('leadSuccessMessage');

    if (demoLeadForm) {
        demoLeadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide form and show success message
            demoLeadForm.style.display = 'none';
            leadSuccessMessage.style.display = 'block';

            // Reset after 5 seconds
            setTimeout(function() {
                demoLeadForm.style.display = 'block';
                leadSuccessMessage.style.display = 'none';
                demoLeadForm.reset();
            }, 5000);
        });
    }

    // Content Generator Demo
    const contentTopic = document.getElementById('contentTopic');
    const generateContentBtn = document.getElementById('generateContentBtn');
    const generatedContent = document.getElementById('generatedContent');
    const contentOutput = document.getElementById('contentOutput');

    const contentSamples = {
        'blog': `
            <h3>5 Warning Signs You Need a New Roof</h3>
            <p>Your roof is your home's first line of defense against the elements. Knowing when it's time for a replacement can save you thousands in water damage and energy costs. Here are the top signs to watch for:</p>
            <ol>
                <li><strong>Age:</strong> Most asphalt shingle roofs last 20-25 years. If yours is approaching this age, it's time to plan for replacement.</li>
                <li><strong>Curling or Missing Shingles:</strong> Shingles that are curling, cracking, or missing indicate weathering and potential leaks.</li>
                <li><strong>Granules in Gutters:</strong> Excessive granule loss means your shingles are wearing out and losing effectiveness.</li>
                <li><strong>Sagging Roof Deck:</strong> A sagging roofline indicates structural issues that require immediate attention.</li>
                <li><strong>Interior Water Damage:</strong> Stains on ceilings or walls are clear signs of roof leaks.</li>
            </ol>
            <p>Don't wait until minor issues become major problems. Contact us today for a free roof inspection and estimate!</p>
        `,
        'social': `
            <h3>Social Media Post: Roof Maintenance Tips</h3>
            <p><strong>Post Copy:</strong></p>
            <p>🏠 Spring Roof Maintenance Checklist 🏠</p>
            <p>Protect your biggest investment with these simple maintenance tasks:</p>
            <p>✅ Clean gutters and downspouts<br>
            ✅ Inspect for damaged or missing shingles<br>
            ✅ Check for moss or algae growth<br>
            ✅ Trim overhanging tree branches<br>
            ✅ Look for signs of wear around vents and chimneys</p>
            <p>Need help? We offer FREE roof inspections! 📞 Call us today.</p>
            <p>#RoofMaintenance #HomeOwnerTips #RoofingExperts #SpringCleaning</p>
        `,
        'email': `
            <h3>Email: Seasonal Roofing Promotion</h3>
            <p><strong>Subject:</strong> Save 15% on Roof Repairs This Month Only!</p>
            <p><strong>Email Body:</strong></p>
            <p>Hi [First Name],</p>
            <p>Spring is the perfect time to address any roof damage from winter weather. For a limited time, we're offering 15% off all roof repair services!</p>
            <p><strong>This special offer includes:</strong></p>
            <ul>
                <li>Free comprehensive roof inspection</li>
                <li>15% discount on all repair work</li>
                <li>Same-day service available</li>
                <li>5-year workmanship warranty</li>
            </ul>
            <p>Don't let small problems become expensive disasters. Schedule your free inspection today!</p>
            <p>[CTA Button: Schedule My Free Inspection]</p>
            <p>This offer expires [Date]. Call us at [Phone] or click the button above.</p>
            <p>Best regards,<br>
            [Your Name]<br>
            [Company Name]</p>
        `,
        'landing': `
            <h3>Landing Page: Emergency Roof Repairs</h3>
            <p><strong>Headline:</strong> 24/7 Emergency Roof Repair Services</p>
            <p><strong>Subheadline:</strong> Fast Response • Licensed Experts • Insurance Approved</p>
            <p><strong>Body Copy:</strong></p>
            <p>When disaster strikes, you need a roofing company you can trust to respond immediately. Our emergency repair team is available 24/7 to protect your home and family.</p>
            <p><strong>Why Choose Us for Emergency Repairs?</strong></p>
            <ul>
                <li>⚡ Rapid Response: On-site within 2 hours</li>
                <li>🔧 Expert Technicians: Licensed and insured professionals</li>
                <li>📋 Insurance Assistance: We work directly with your insurance</li>
                <li>✓ Temporary Solutions: Immediate tarping and weatherproofing</li>
                <li>💯 Guaranteed Work: All repairs backed by our warranty</li>
            </ul>
            <p><strong>Call Now: 1-800-ROOF-911</strong></p>
            <p>Or fill out the form below for immediate callback:</p>
            <p>[Contact Form]</p>
        `
    };

    if (generateContentBtn) {
        generateContentBtn.addEventListener('click', function() {
            const topic = contentTopic.value;
            
            if (!topic) {
                alert('Please select a content type');
                return;
            }

            // Show loading state
            generateContentBtn.textContent = 'Generating...';
            generateContentBtn.disabled = true;

            // Simulate content generation delay
            setTimeout(function() {
                contentOutput.innerHTML = contentSamples[topic];
                generatedContent.style.display = 'block';
                generateContentBtn.textContent = 'Generate Content';
                generateContentBtn.disabled = false;

                // Smooth scroll to generated content
                generatedContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 2000);
        });
    }

    // Copy to clipboard functionality
    const btnCopy = document.querySelector('.btn-copy');
    if (btnCopy) {
        btnCopy.addEventListener('click', function() {
            const content = contentOutput.innerText;
            navigator.clipboard.writeText(content).then(function() {
                btnCopy.textContent = 'Copied!';
                setTimeout(function() {
                    btnCopy.textContent = 'Copy';
                }, 2000);
            });
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In production, this would send data to a server
            // For now, just show success message
            
            // Show success message
            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';

            // Reset form after showing success
            setTimeout(function() {
                contactForm.reset();
            }, 1000);
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
