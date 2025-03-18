import xml.etree.ElementTree as ET

# Define file paths
xml_file = "/var/lib/jenkins/workspace/zap/report.xml"
html_file = "/var/lib/jenkins/workspace/zap/report.html"

try:
    # Parse the XML file
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # Start HTML structure
    html_content = "<html><body><h2>Converted XML Data</h2><ul>"

    # Convert XML elements into HTML list items
    for elem in root:
        html_content += f"<li>{elem.tag}: {elem.text}</li>"

    html_content += "</ul></body></html>"

    # Write to HTML file
    with open(html_file, "w") as f:
        f.write(html_content)

    print(f"✅ Conversion complete! HTML saved as {html_file}")

except Exception as e:
    print(f"❌ Error during conversion: {e}")
