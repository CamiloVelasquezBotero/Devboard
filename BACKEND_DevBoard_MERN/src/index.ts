import colors from 'colors'
import server from './server' /* app de express */

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(colors.green.bold(`REST API working on the port ${port}`))}
)