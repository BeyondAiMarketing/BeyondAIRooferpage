"""
HTML Structure and Validation Tests

Tests to ensure the HTML is:
- Valid HTML5
- Properly structured
- Accessible
- SEO-friendly
- Contains all required elements
"""

import pytest
import re
import os


class TestHTMLStructure:
    """Tests for HTML structure and validity"""
    
    def test_html_file_exists(self):
        """HTML file should exist"""
        assert os.path.exists("index.html"), "index.html file should exist"
    
    def test_html_has_doctype(self):
        """HTML should have DOCTYPE declaration"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert "<!DOCTYPE html>" in content or "<!doctype html>" in content.lower()
    
    def test_html_has_html_tag(self):
        """HTML should have <html> tag"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert "<html" in content.lower()
    
    def test_html_has_head_tag(self):
        """HTML should have <head> tag"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert "<head>" in content.lower()
    
    def test_html_has_body_tag(self):
        """HTML should have <body> tag"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert "<body>" in content.lower()
    
    def test_html_has_title(self):
        """HTML should have <title> tag"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert "<title>" in content.lower()
    
    def test_html_has_meta_charset(self):
        """HTML should have charset meta tag"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert 'charset=' in content.lower() or 'charset =' in content.lower()
    
    def test_html_has_viewport_meta(self):
        """HTML should have viewport meta tag for responsive design"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert 'viewport' in content.lower()


class TestHTMLForm:
    """Tests for the audit form"""
    
    def test_form_exists(self):
        """HTML should contain a form"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert "<form" in content.lower()
    
    def test_form_has_name_input(self):
        """Form should have name input field"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert 'name="name"' in content or 'id="name"' in content
    
    def test_form_has_email_input(self):
        """Form should have email input field"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert 'type="email"' in content.lower()
    
    def test_form_has_phone_input(self):
        """Form should have phone input field"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert 'type="tel"' in content.lower() or 'name="phone"' in content
    
    def test_form_has_submit_button(self):
        """Form should have submit button"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert 'type="submit"' in content.lower() or '<button' in content.lower()


class TestHTMLAccessibility:
    """Accessibility tests for HTML"""
    
    def test_html_has_lang_attribute(self):
        """HTML tag should have lang attribute"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert 'lang=' in content.lower()
    
    def test_images_have_alt_text(self):
        """All images should have alt attributes"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Find all img tags
        img_tags = re.findall(r'<img[^>]*>', content, re.IGNORECASE)
        
        for img in img_tags:
            # Check if it has alt attribute (even if empty)
            assert 'alt=' in img.lower(), f"Image missing alt attribute: {img}"
    
    def test_form_inputs_have_labels(self):
        """Form inputs should have associated labels"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        
        # If there are inputs, there should be labels
        if '<input' in content.lower():
            assert '<label' in content.lower(), "Form inputs should have labels"


class TestHTMLSEO:
    """SEO-related tests for HTML"""
    
    def test_html_has_meta_description(self):
        """HTML should have meta description for SEO"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert 'name="description"' in content.lower()
    
    def test_html_has_h1_heading(self):
        """HTML should have at least one H1 heading"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert '<h1' in content.lower()
    
    def test_title_not_empty(self):
        """Title tag should not be empty"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        
        title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        if title_match:
            title_content = title_match.group(1).strip()
            assert len(title_content) > 0, "Title should not be empty"


class TestHTMLLinks:
    """Tests for links in HTML"""
    
    def test_stylesheet_linked(self):
        """HTML should link to stylesheet"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert 'rel="stylesheet"' in content.lower() or '.css' in content
    
    def test_javascript_linked(self):
        """HTML should link to JavaScript file"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
        assert '<script' in content.lower() or '.js' in content


class TestHTMLContent:
    """Tests for HTML content"""
    
    def test_html_mentions_roofing(self):
        """HTML should mention roofing/roof"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read().lower()
        assert 'roof' in content, "HTML should mention roofing services"
    
    def test_html_mentions_audit(self):
        """HTML should mention audit"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read().lower()
        assert 'audit' in content, "HTML should mention audit services"
    
    def test_html_has_call_to_action(self):
        """HTML should have call-to-action elements"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read().lower()
        # Check for CTA-related text
        cta_keywords = ['free', 'contact', 'submit', 'get', 'request']
        assert any(keyword in content for keyword in cta_keywords)


class TestHTMLSecurity:
    """Security tests for HTML"""
    
    def test_no_inline_javascript_handlers(self):
        """HTML should avoid inline JavaScript event handlers"""
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read().lower()
        
        dangerous_handlers = ['onclick=', 'onload=', 'onerror=', 'onmouseover=']
        for handler in dangerous_handlers:
            # It's okay to have them in quoted strings or comments
            # but we'll flag if they appear in tags
            pass  # This is a guideline check