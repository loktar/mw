require "#{ROOT_DIR}/lib/google/resources_parser"

describe Google::ResourcesParser do
  describe "#from_xml" do
    let(:fixture_success) { IO.read("#{ROOT_DIR}/spec/fixtures/google_resources_response.xml") }

    it 'should parse the resource names' do
      parser = Google::ResourcesParser.new
      resources = parser.from_xml(fixture_success)
      expect(resources.map { |r| r.name }).to eq ["SF-The Bat Cave-2", "SF-Ian's Desk-1", "SF-Print Center-1", "Embarcadero", "SF-Kiki's Desk-1", "SF-The Café-1"]
    end

    it 'should parse the resource identifiers' do
      parser = Google::ResourcesParser.new
      resources = parser.from_xml(fixture_success)
      expect(resources[0].identifier).to eq '-15097206368'
      expect(resources[1].identifier).to eq '-57668534457'
    end
  end
end