
const ilp = require('..')

//Load the custom module type 'widget' from the app's CWD
const greeter = ilp.createModule('widget', 'my-widget', {greeting: 'World'})

// Uses built-in mirror plugin unless ilp-plugin-btp is available (in which case)
const plugin = ilp.createPlugin()

async function run () {
  greeter.hello(`ILP_MODULE_ROOT=${process.env['ILP_MODULE_ROOT']}`)

  plugin.registerDataHandler(async () => { return Buffer.from('Pong', 'utf-8') })
  await plugin.connect()
  plugin.sendData(Buffer.from('Ping', 'utf-8')).then( response => {
    greeter.hello(`response==${response}`)
    process.exit(0)
  }).catch( e => {
    greeter.hello(`error==${e}`)
    process.exit(1)
  })
}
run()