require 'rubygems'
require 'jira-ruby'

class JiraClient

  def initialize

    options = {
      :username     => 'developer@futureuniverse.com',
      :password     => 'tfgD3v2015',
      :site         => 'http://futureuniverse.atlassian.net:443/',
      :context_path => '',
      :auth_type    => :basic
    }

    @jiraClient = JIRA::Client.new(options)

  end

  private def returnIssuesForProject(projectName)
    project = @jiraClient.Project.find(projectName)
    return project.issues
  end

  def findIssue(issue)
    return @jiraClient.Issue.find("#{issue}")
  end

  def showTransitionsForIssue(issue)
    return @jiraClient.Transition.all(:issue => issue)
  end

  def showIssuesForProject(projectName)
    returnIssuesForProject(projectName).each do |issue|
      puts "#{issue.id} - #{issue.summary}"
    end
  end

  def updateSummaryForIssue(issue, summary)

    currentIssue = @jiraClient.Issue.find("#{issue}")
    currentIssue.save!({"fields"=>{"summary"=>"#{summary}"}})

  end

  def addCommentForIssue(issue, comment)

    currentIssue = @jiraClient.Issue.find("#{issue}")
    buildComment = currentIssue.comments.build
    buildComment.save!(:body => "#{comment}")

  end

  def issueStatus(issue)

    currentIssue = findIssue(issue)
    if currentIssue.attrs["fields"]["status"]
      return currentIssue.attrs["fields"]["status"]["name"]
    end

  end

  def updateJiraStatusForIssue(issue, status)

    currentIssue = findIssue(issue)
    available_transitions = showTransitionsForIssue(currentIssue)
    available_transitions.each do |transitions|

      if "#{transitions.name}" == "#{status}"

        # Update the status of jira ticket
        transitionIssue = currentIssue.transitions.build
        transitionIssue.save!('transition' => {'id' => "#{transitions.id}"})

      end

		end

  end

end
