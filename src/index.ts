import { Application } from 'probot' // eslint-disable-line no-unused-vars
import * as shell from 'shelljs'

export = (app: Application) => {
  if (shell.which('black')) {
    app.log.info('***yay! have black')
  } else {
    app.log.error('***WTF! dont have black')
  }

  app.on('issues.opened', async (context) => {
    const issueComment = context.issue({
      body: 'Thanks for opening this issue!'
    })
    await context.github.issues.createComment(issueComment)
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
