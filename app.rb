require 'sinatra'
require 'net/http'
require 'json'

ROOT_DIR=File.dirname(__FILE__)

require "#{ROOT_DIR}/lib/google/resources_parser"

get '/' do
	haml :index
end

get '/api/v1/google/resources' do
	uri = URI('https://apps-apis.google.com/a/feeds/calendar/resource/2.0/taptera.com/')

	req = Net::HTTP::Get.new(uri)
	req['Authorization'] = request.env['HTTP_AUTHORIZATION']

	http = Net::HTTP.new(uri.hostname, uri.port)
	http.use_ssl = true
	res = http.request(req)
	
	resources = Google::ResourcesParser.new.from_xml(res.body)
	json = resources.map do |r|
		{
				name: r.name,
				identifier: r.identifier
		}
	end

	content_type :json
	json.to_json
end