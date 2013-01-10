require 'json'
require 'typhoeus'
class ProxiedRequest
  def initialize options={}
    @url            = options[:url]
    @url_template   = options[:url_template]
    @method         = options[:method]
    @params         = options[:params]
    @persist        = !!options[:persist]
  end

  def response
  end

  protected
    def parse_template
    end
end