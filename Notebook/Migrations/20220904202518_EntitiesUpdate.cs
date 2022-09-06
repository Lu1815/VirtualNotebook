using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Notebook.Migrations
{
    public partial class EntitiesUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Topic_IdTopicNavigationTopicId",
                table: "Note");

            migrationBuilder.DropIndex(
                name: "IX_Note_IdTopicNavigationTopicId",
                table: "Note");

            migrationBuilder.DropColumn(
                name: "IdTopicNavigationTopicId",
                table: "Note");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Topic",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "IdTopic",
                table: "Note",
                newName: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_Note_TopicId",
                table: "Note",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Topic_TopicId",
                table: "Note",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "TopicId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Topic_TopicId",
                table: "Note");

            migrationBuilder.DropIndex(
                name: "IX_Note_TopicId",
                table: "Note");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Topic",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "TopicId",
                table: "Note",
                newName: "IdTopic");

            migrationBuilder.AddColumn<Guid>(
                name: "IdTopicNavigationTopicId",
                table: "Note",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Note_IdTopicNavigationTopicId",
                table: "Note",
                column: "IdTopicNavigationTopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Topic_IdTopicNavigationTopicId",
                table: "Note",
                column: "IdTopicNavigationTopicId",
                principalTable: "Topic",
                principalColumn: "TopicId");
        }
    }
}
