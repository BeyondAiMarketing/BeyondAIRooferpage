"""Comprehensive validation tests for HTML, CSS, and README"""
import os
import re

class TestHTMLValidation:
    def test_html_exists(self):
        assert os.path.exists("index.html")
    
    def test_html_has_doctype(self):
        with open("index.html") as f:
            assert "<!DOCTYPE html>" in f.read()
    
    def test_html_has_viewport_meta(self):
        with open("index.html") as f:
            assert "viewport" in f.read()
    
    def test_html_has_audit_form(self):
        with open("index.html") as f:
            content = f.read()
            assert "auditUrl" in content or "audit" in content.lower()

class TestCSSValidation:
    def test_css_exists(self):
        assert os.path.exists("styles.css")
    
    def test_css_has_colors(self):
        with open("styles.css") as f:
            content = f.read()
            assert "#" in content or "rgb" in content
    
    def test_css_has_media_queries(self):
        with open("styles.css") as f:
            assert "@media" in f.read()
    
    def test_css_balanced_braces(self):
        with open("styles.css") as f:
            content = f.read()
            assert content.count("{") == content.count("}")

class TestREADMEValidation:
    def test_readme_exists(self):
        assert os.path.exists("README.md")
    
    def test_readme_not_empty(self):
        with open("README.md") as f:
            assert len(f.read().strip()) > 100
    
    def test_readme_has_headings(self):
        with open("README.md") as f:
            assert "#" in f.read()
    
    def test_readme_mentions_project(self):
        with open("README.md") as f:
            content = f.read().lower()
            assert "roof" in content or "audit" in content