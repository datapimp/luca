require "spec_helper"

describe ComponentDefinition do
  let(:path) { File.join(Rails.root,"spec","support","fixtures","component.coffee")}
  let(:definition) { ComponentDefinition.new(path) }

  it "should be valid" do
    definition.should be_valid
  end

  it "should recognize the class being defined" do
    definition.class_name.should == "Luca.SampleComponent"
  end

  it "should know the type alias" do
    definition.type_alias.should == "sample_component"
  end

  it "should be view based" do
    definition.should be_view_based
  end

  it "should have a css class identifier" do
    definition.css_class_identifier.should == "luca-sample-component"
  end

  it "should know the class it extends" do
    definition.extends.should == "Luca.View"
  end

  it "should detect the definition variable name" do
    definition.definition_proxy_variable_name.should == "component"
  end

  it "should tell me which methods are defined" do
    definition.defines_methods.should == ["methodOne","methodTwo"]
  end

  it "should tell me which properties are defined" do
    definition.defines_properties.should == ["privateSetting","el","bodyClassName", "publicSetting"]
  end

  it "should tell me where a method is defined" do
    definition.find_definition_of("methodOne").line_number.should > 0
  end

  it "should tell me where a property is defined" do
    definition.find_definition_of("privateSetting").line_number.should > 0
  end

  it "should find the documentation for a method definition" do
    definition.find_comments_above("methodOne").should_not be_empty
  end

  it "should produce human readable documentation for a method definition" do
    definition.documentation_for("methodOne").should == "here is some documentation for methodOne"
  end

  it "should not pick up things which aren't documentation" do
    definition.documentation_for("bodyClassName").should == ""
  end

end