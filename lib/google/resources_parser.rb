require 'nokogiri'
require "#{ROOT_DIR}/lib/models/resource"

module Google
  class ResourcesParser
    def from_xml(xml)
      doc = Nokogiri::XML(xml)
      doc.remove_namespaces!
      doc.xpath('/feed/entry').map do |resource_node|
        r = Resource.new
        r.name = resource_node.xpath("property[@name='resourceCommonName']/@value").first.text
        r.identifier = resource_node.xpath("property[@name='resourceEmail']/@value").first.text
        r
      end
    end
  end
end