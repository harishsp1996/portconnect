import sys
import os
import xml.etree.ElementTree as ET

def xml_to_html(xml_file, output_html):
    if not os.path.exists(xml_file):
        print(f"Error: XML file {xml_file} not found!")
        sys.exit(1)

    tree = ET.parse(xml_file)
    root = tree.getroot()

    html_content = "<html><head><title>ZAP Report</title></head><body>"
    html_content += "<h1>ZAP Scan Report</h1>"
    html_content += "<table border='1'><tr><th>Alert</th><th>Risk</th><th>Description</th></tr>"

    for alert in root.findall(".//alertitem"):
        name = alert.findtext("alert", "N/A")
        risk = alert.findtext("riskdesc", "N/A")
        desc = alert.findtext("desc", "N/A")
        html_content += f"<tr><td>{name}</td><td>{risk}</td><td>{desc}</td></tr>"

    html_content += "</table></body></html>"

    with open(output_html, "w") as html_file:
        html_file.write(html_content)

    print(f"HTML report saved: {output_html}")

if __name__ == "__main__":
    xml_file = sys.argv[1]  # Report XML path
    output_html = sys.argv[2]  # Output HTML path
    xml_to_html(xml_file, output_html)
