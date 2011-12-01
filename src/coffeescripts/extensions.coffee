UnderscoreMixins =
  classify: (string)-> str = _(string).camelize(); str.charAt(0).toUpperCase() + str.substring(1)

  camelize: (string)->
    string.replace /_+(.)?/g, (match, chr)->
      chr.toUpperCase() if chr? 

  underscore: (string)-> 
    string.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/-/g, '_').toLowerCase()

  module: (base,module)->
    _.extend base, module
    if base.included and _(base.included).isFunction()
      base.included.apply(base)


_.mixin UnderscoreMixins 


Date.prototype.toUTCArray = ()->
  D = @
  [D.getUTCFullYear(), D.getUTCMonth(), D.getUTCDate(), D.getUTCHours(), D.getUTCMinutes(), D.getUTCSeconds() ]

Date.prototype.toISO = ()->
  A = @toUTCArray()
  i = 0
  A[1]+= 1

  while(i++<7)
    temp = A[i]
    A[i] = "0#{ temp }" if temp < 10
  
  A.splice(0,3).join('-') + 'T' + A.join(':')
  
Date.fromISO = (str)->
  # we assume str is a UTC date ending in 'Z'
  parts = str.split('T')
  dateParts = parts[0].split('-')
  timeParts = parts[1].split('Z')
  timeSubParts = timeParts[0].split(':')
  timeSecParts = timeSubParts[2].split('.')
  timeHours = Number(timeSubParts[0])
  _date = new Date

  _date.setUTCFullYear(Number(dateParts[0]))
  _date.setUTCMonth(Number(dateParts[1])-1)
  _date.setUTCDate(Number(dateParts[2]))
  _date.setUTCHours(Number(timeHours))
  _date.setUTCMinutes(Number(timeSubParts[1]))
  _date.setUTCSeconds(Number(timeSecParts[0]))
  _date.setUTCMilliseconds(Number(timeSecParts[1])) if (timeSecParts[1])

  # by using setUTC methods the date has already been converted to local time(?)
  return _date

Array.prototype.remove = (from,to)->
  rest = @slice( (to or from) + 1 or @length )
  @length = if from < 0 then @length + from else from
  @push.apply @, rest

