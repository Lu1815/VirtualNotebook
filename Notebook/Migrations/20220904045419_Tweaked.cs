using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Notebook.Migrations
{
    public partial class Tweaked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Topic_NoteId",
                table: "Note");

            migrationBuilder.AddColumn<Guid>(
                name: "IdTopic",
                table: "Note",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Topic_IdTopicNavigationTopicId",
                table: "Note");

            migrationBuilder.DropIndex(
                name: "IX_Note_IdTopicNavigationTopicId",
                table: "Note");

            migrationBuilder.DropColumn(
                name: "IdTopic",
                table: "Note");

            migrationBuilder.DropColumn(
                name: "IdTopicNavigationTopicId",
                table: "Note");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Topic_NoteId",
                table: "Note",
                column: "NoteId",
                principalTable: "Topic",
                principalColumn: "TopicId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
