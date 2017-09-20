require "test/unit"
require_relative 'jiraClient'

class JiraClientTests < Test::Unit::TestCase

	def setup
		@issueId = "LIVE-396"
		@jiraClient = JiraClient.new
	end

	def test_showIssuesForProject
		#@jiraClient.showIssuesForProject(["LIVE"])
	end

	def test_updateIssueStatus
		#@jiraClient.updateJiraStatusForIssue(@issueId, "In Progress")
	end

	def test_updateIssueSummary
		#@jiraClient.updateSummaryForIssue(@issueId, "Making some mess here!! 😆")
	end

	def test_addCommentForTicket
		@jiraClient.addCommentForIssue(@issueId, "Hello from CI!! 🏄")
	end

end
