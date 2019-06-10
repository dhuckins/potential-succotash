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
    let commit = await context.github.gitdata.getCommit({
      commit_sha: pullRequest.head.sha,
      owner: pullRequest.head.owner.login,
      repo: pullRequest.head.name
    })
    await context.github.issues.createComment(context.issue({
      body: JSON.stringify(commit)
    }))
  })

  app.on('pull_request.ready_for_review', async (context: Context) => {
    await context.github.issues.createComment(context.issue({
      body: 'The pull request is ready for review'
    }))
  })
}
