﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Notebook.Data;

#nullable disable

namespace Notebook.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220904045419_Tweaked")]
    partial class Tweaked
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Notebook.Models.Note", b =>
                {
                    b.Property<Guid>("NoteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Body")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("IdTopic")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("IdTopicNavigationTopicId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("StartDateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("NoteId");

                    b.HasIndex("IdTopicNavigationTopicId");

                    b.ToTable("Note");
                });

            modelBuilder.Entity("Notebook.Models.Topic", b =>
                {
                    b.Property<Guid>("TopicId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TopicId");

                    b.ToTable("Topic");
                });

            modelBuilder.Entity("Notebook.Models.Note", b =>
                {
                    b.HasOne("Notebook.Models.Topic", "IdTopicNavigation")
                        .WithMany("Notes")
                        .HasForeignKey("IdTopicNavigationTopicId");

                    b.Navigation("IdTopicNavigation");
                });

            modelBuilder.Entity("Notebook.Models.Topic", b =>
                {
                    b.Navigation("Notes");
                });
#pragma warning restore 612, 618
        }
    }
}
