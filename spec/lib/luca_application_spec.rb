require "spec_helper"

describe LucaApplication do
  let(:repo) { LucaApplication.new("tools") }
  let(:application_file_path) { File.join(repo.send(:coffeescripts_location),'tools_application.coffee') }

  it "should retrieve source code for a component" do
    source_length = repo.source_code_for_class("Tools.Application").length
    file_length = File.size( repo.find_definition_file_for_class('Tools.Application') )
    file_length.should be_within(5).of( source_length ) 
  end

  it "should map all component definitions to their respective files" do
    map = repo.component_definition_filemap
    map["Tools.Application"].should == application_file_path
  end

  xit "should find a template object by its filename" do
  end

  it "should find a component definition by class name" do
    repo.find_component_definition_for_class('Tools.Application').should be_present
    repo.find_component_definition_for_class('Tools.Collection').should be_present
  end

  it "should detect the namespace" do
    repo.namespace.should == "Tools"
  end

end