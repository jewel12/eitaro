require 'net/http'
require 'uri'
require 'json'

api_key = ENV['GOOGLE_CLOUD_NL_KEY']

uri = URI.parse("https://language.googleapis.com/v1/documents:analyzeSyntax?key=#{api_key}")
header = {'Content-Type': 'text/json'}

STDIN.each_line do |l|
  d = {
    document: {
      type: "PLAIN_TEXT",
      content: l
    },
    encodingType: "UTF8"
  }

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  request = Net::HTTP::Post.new(uri.request_uri, header)
  request.body = d.to_json

  response = http.request(request)

  puts(JSON.generate(JSON.parse(response.body)))
end

