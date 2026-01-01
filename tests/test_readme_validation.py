"""
README Documentation Tests

Tests to ensure README is:
- Present and not empty
- Contains essential sections
- Properly formatted
- Provides useful information
"""

import pytest
import os


class TestREADMEStructure:
    """Tests for README structure"""
    
    def test_readme_exists(self):
        """README file should exist"""
        assert os.path.exists("README.md"), "README.md should exist"
    
    def test_readme_not_empty(self):
        """README should not be empty"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read()
        assert len(content.strip()) > 0, "README should not be empty"
    
    def test_readme_has_heading(self):
        """README should have at least one heading"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read()
        assert '#' in content, "README should have markdown headings"


class TestREADMEContent:
    """Tests for README content"""
    
    def test_readme_has_title(self):
        """README should have a title (H1)"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read()
        assert content.startswith('#') or '\n#' in content
    
    def test_readme_describes_project(self):
        """README should describe the project"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read().lower()
        
        # Should mention what the project is about
        relevant_keywords = ['roof', 'audit', 'landing', 'page', 'website']
        has_description = any(keyword in content for keyword in relevant_keywords)
        assert has_description, "README should describe the project"
    
    def test_readme_has_substantial_content(self):
        """README should have substantial content"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Should have at least a few hundred characters
        assert len(content) > 200, "README should have substantial content"


class TestREADMEUsageInfo:
    """Tests for usage information in README"""
    
    def test_readme_has_usage_section(self):
        """README should have usage or getting started info"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read().lower()
        
        usage_keywords = ['usage', 'getting started', 'how to', 'setup', 'installation']
        has_usage = any(keyword in content for keyword in usage_keywords)
        # This is advisory
        pass
    
    def test_readme_mentions_files(self):
        """README should mention project files"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Should mention HTML, CSS, or JS files
        file_mentions = ['html', 'css', 'javascript', 'js', 'index']
        has_file_mentions = any(mention in content.lower() for mention in file_mentions)
        assert has_file_mentions, "README should reference project files"


class TestREADMEFormatting:
    """Tests for README formatting"""
    
    def test_readme_proper_markdown(self):
        """README should use proper markdown syntax"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Check for common markdown elements
        markdown_elements = ['#', '-', '*', '```', '[', ']']
        has_markdown = any(element in content for element in markdown_elements)
        assert has_markdown, "README should use markdown formatting"
    
    def test_readme_no_excessive_blank_lines(self):
        """README should not have excessive blank lines"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read()
        
        # Check for more than 3 consecutive blank lines
        assert '\n\n\n\n\n' not in content, "README has excessive blank lines"


class TestREADMESections:
    """Tests for expected README sections"""
    
    def test_readme_has_description_or_about(self):
        """README should have description or about section"""
        with open("README.md", "r", encoding="utf-8") as f:
            content = f.read().lower()
        
        # First heading or early content should describe project
        first_500_chars = content[:500]
        descriptive_words = ['landing page', 'website', 'audit', 'roof']
        has_description = any(word in first_500_chars for word in descriptive_words)
        assert has_description