import { Application, Context } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on('issues.opened', async (context: Context) => {
    const issueComment = context.issue({
      body: 'Thanks for opening this issue!'
    })
    await context.github.issues.createComment(issueComment)
  })

  app.on('pull_request.opened', async (context: Context) => {
    let pullRequest = context.payload.pull_request
    await context.github.issues.createComment(context.issue({
      body: JSON.stringify(pullRequest, null, '  ')
    }))
  })

  app.on('pull_request.ready_for_review', async (context: Context) => {
    await context.github.issues.createComment(context.issue({
      body: 'The pull request is ready for review'
    }))
  })
}
