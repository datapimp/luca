#!/usr/bin/env ruby

pattern = /([\w\.]+).=.([\w\.]+)\.extend/

files = Dir.glob("**/*.coffee")

files.each do |file|
  data = IO.read(file)
  lines = data.lines.to_a

  if lines.length > 0 and first = lines[0] and match = first.match(pattern)
    lines[0] = "_.def('#{ match[1] }').extends('#{ match[2] }').with\n"

    File.open(file,'w+') {|fh| fh.puts(lines.join(""))}
  end

end