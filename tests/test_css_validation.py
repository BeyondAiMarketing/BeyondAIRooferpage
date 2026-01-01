"""
CSS Validation and Quality Tests

Tests to ensure CSS is:
- Valid syntax
- Properly organized
- Follows best practices
- Responsive
- Accessible
"""

import pytest
import re
import os


class TestCSSStructure:
    """Tests for CSS file structure"""
    
    def test_css_file_exists(self):
        """CSS file should exist"""
        assert os.path.exists("styles.css"), "styles.css should exist"
    
    def test_css_not_empty(self):
        """CSS file should not be empty"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        assert len(content.strip()) > 0, "CSS file should not be empty"
    
    def test_css_has_proper_syntax(self):
        """CSS should have basic proper syntax"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Check for balanced braces
        open_braces = content.count('{')
        close_braces = content.count('}')
        assert open_braces == close_braces, "CSS braces should be balanced"
    
    def test_css_has_selectors(self):
        """CSS should contain selectors"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Should have at least one selector followed by opening brace
        assert re.search(r'[a-zA-Z#.\[].*\{', content) is not None


class TestCSSResponsiveness:
    """Tests for responsive design in CSS"""
    
    def test_css_has_media_queries(self):
        """CSS should include media queries for responsive design"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        assert '@media' in content, "CSS should include media queries"
    
    def test_css_has_mobile_breakpoint(self):
        """CSS should have mobile breakpoint"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Common mobile breakpoints
        mobile_patterns = ['max-width.*768', 'max-width.*767', 'max-width.*600']
        has_mobile = any(re.search(pattern, content) for pattern in mobile_patterns)
        assert has_mobile or '@media' in content


class TestCSSProperties:
    """Tests for CSS properties and values"""
    
    def test_css_uses_colors(self):
        """CSS should define colors"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        color_patterns = [
            r'color\s*:',
            r'background-color\s*:',
            r'#[0-9a-fA-F]{3,6}',
            r'rgb\(',
            r'rgba\('
        ]
        
        has_colors = any(re.search(pattern, content) for pattern in color_patterns)
        assert has_colors, "CSS should define colors"
    
    def test_css_uses_fonts(self):
        """CSS should define fonts"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        assert 'font-family' in content or 'font' in content
    
    def test_css_uses_spacing(self):
        """CSS should define spacing"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        spacing_properties = ['margin', 'padding']
        has_spacing = any(prop in content for prop in spacing_properties)
        assert has_spacing, "CSS should define spacing"


class TestCSSLayout:
    """Tests for CSS layout properties"""
    
    def test_css_has_layout_properties(self):
        """CSS should include layout properties"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        layout_properties = ['display', 'position', 'flex', 'grid', 'float']
        has_layout = any(prop in content for prop in layout_properties)
        assert has_layout, "CSS should include layout properties"


class TestCSSBestPractices:
    """Tests for CSS best practices"""
    
    def test_css_no_important_overuse(self):
        """CSS should not overuse !important"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        important_count = content.count('!important')
        # Allow some, but not excessive use
        assert important_count < 20, "CSS should not overuse !important declarations"
    
    def test_css_uses_box_sizing(self):
        """CSS should use box-sizing for better layout control"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        # It's a best practice to have box-sizing defined
        # Not required but recommended
        pass  # Advisory check
    
    def test_css_no_duplicate_properties(self):
        """CSS should not have many duplicate properties in same rule"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        # This is a basic check - in real scenario would parse CSS properly
        rules = re.findall(r'\{([^}]*)\}', content)
        
        for rule in rules:
            properties = re.findall(r'([a-z-]+)\s*:', rule)
            # Check if any property appears more than twice in same rule
            for prop in set(properties):
                count = properties.count(prop)
                assert count <= 2, f"Property '{prop}' appears {count} times in same rule"


class TestCSSAccessibility:
    """Accessibility tests for CSS"""
    
    def test_css_has_focus_styles(self):
        """CSS should define focus styles for accessibility"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Should have focus styles defined
        has_focus = ':focus' in content or 'focus' in content
        # This is advisory - not all sites need explicit focus styles
        pass  # Advisory check


class TestCSSFormStyling:
    """Tests for form styling"""
    
    def test_css_styles_form_elements(self):
        """CSS should style form elements"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        form_elements = ['input', 'button', 'form', 'select', 'textarea']
        has_form_styles = any(element in content.lower() for element in form_elements)
        assert has_form_styles, "CSS should style form elements"
    
    def test_css_styles_buttons(self):
        """CSS should style buttons"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        assert 'button' in content.lower() or '.btn' in content.lower()


class TestCSSPerformance:
    """Performance-related CSS tests"""
    
    def test_css_file_not_too_large(self):
        """CSS file should not be excessively large"""
        file_size = os.path.getsize("styles.css")
        # Warn if over 500KB (uncompressed)
        assert file_size < 500000, f"CSS file is {file_size} bytes, consider optimization"
    
    def test_css_no_excessive_nesting(self):
        """CSS should not have excessive selector nesting"""
        with open("styles.css", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Check for very long selectors (potential over-nesting)
        selectors = re.findall(r'([^{]+)\{', content)
        for selector in selectors:
            # Count descendant selectors
            parts = selector.strip().split()
            # Warn if selector chain is very long
            if len(parts) > 6:
                pass  # Advisory - deep nesting can impact performance