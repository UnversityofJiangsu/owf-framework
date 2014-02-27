-- *********************************************************************
-- Update Database Script
-- *********************************************************************
-- Change Log: changelog.groovy
-- Ran at: 2/4/14 12:03 PM

-- Liquibase version: 2.0.1
-- *********************************************************************

-- Lock Database
-- Changeset changelog_7.10.0.groovy::7.10.0-2::owf::(Checksum: 3:41ac759cfb732888d39c704edd1aa12d)
INSERT INTO [dbo].[application_configuration] ([code], [group_name], [mutable], [sub_group_order], [title], [type], [value], [version]) VALUES ('notifications.enabled', 'NOTIFICATIONS', 1, 1, ' ', 'Boolean', 'false', 0)
GO

INSERT INTO [dbo].[application_configuration] ([code], [group_name], [mutable], [sub_group_order], [title], [type], [value], [version]) VALUES ('notifications.query.interval', 'NOTIFICATIONS', 1, 2, ' ', 'Integer', '30', 0)
GO

INSERT INTO [dbo].[application_configuration] ([code], [group_name], [mutable], [sub_group_order], [title], [type], [value], [version]) VALUES ('url.public', 'NOTIFICATIONS', 1, 3, ' ', 'String', NULL, 0)
GO

INSERT INTO [dbo].[application_configuration] ([code], [group_name], [mutable], [sub_group_name], [sub_group_order], [title], [type], [value], [version]) VALUES ('notifications.xmpp.server.hostname', 'NOTIFICATIONS', 1, 'XMPP Settings', 1, ' ', 'String', NULL, 0)
GO

INSERT INTO [dbo].[application_configuration] ([code], [group_name], [mutable], [sub_group_name], [sub_group_order], [title], [type], [value], [version]) VALUES ('notifications.xmpp.server.port', 'NOTIFICATIONS', 1, 'XMPP Settings', 2, ' ', 'Integer', '5222', 0)
GO

INSERT INTO [dbo].[application_configuration] ([code], [group_name], [mutable], [sub_group_name], [sub_group_order], [title], [type], [value], [version]) VALUES ('notifications.xmpp.room', 'NOTIFICATIONS', 1, 'XMPP Settings', 3, ' ', 'String', NULL, 0)
GO

INSERT INTO [dbo].[application_configuration] ([code], [group_name], [mutable], [sub_group_name], [sub_group_order], [title], [type], [value], [version]) VALUES ('notifications.xmpp.username', 'NOTIFICATIONS', 1, 'XMPP Settings', 4, ' ', 'String', NULL, 0)
GO

INSERT INTO [dbo].[application_configuration] ([code], [group_name], [mutable], [sub_group_name], [sub_group_order], [title], [type], [value], [version]) VALUES ('notifications.xmpp.password', 'NOTIFICATIONS', 1, 'XMPP Settings', 5, ' ', 'String', NULL, 0)
GO

INSERT INTO [dbo].[DATABASECHANGELOG] ([AUTHOR], [COMMENTS], [DATEEXECUTED], [DESCRIPTION], [EXECTYPE], [FILENAME], [ID], [LIQUIBASE], [MD5SUM], [ORDEREXECUTED]) VALUES ('owf', '', GETDATE(), 'Insert Row (x8)', 'EXECUTED', 'changelog_7.10.0.groovy', '7.10.0-2', '2.0.1', '3:41ac759cfb732888d39c704edd1aa12d', 1)
GO

-- Release Database Lock