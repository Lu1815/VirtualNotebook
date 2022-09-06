using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Notebook.Migrations
{
    public partial class FixedEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Topic_TopicId",
                table: "Note");

            migrationBuilder.DropIndex(
                name: "IX_Note_TopicId",
                table: "Note");

            migrationBuilder.DropColumn(
                name: "TopicId",
                table: "Note");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Topic_NoteId",
                table: "Note",
                column: "NoteId",
                principalTable: "Topic",
                principalColumn: "TopicId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Topic_NoteId",
                table: "Note");

            migrationBuilder.AddColumn<Guid>(
                name: "TopicId",
                table: "Note",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Note_TopicId",
                table: "Note",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Topic_TopicId",
                table: "Note",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "TopicId");
        }
    }
}
