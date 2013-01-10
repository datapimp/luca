require "spec_helper"

describe AssetCompiler do
  xit "should compile coffeescript" do 
    input = "console.log(foo) for foo in [1,2,3]"
    compiler = AssetCompiler.new(mode:"coffeescript", input: input)
    compiler.output.should == "haha"
  end
end