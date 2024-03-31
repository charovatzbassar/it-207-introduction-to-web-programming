$(document).ready(() => {
  const app = $.spapp({
    templateDir: "./views/",
  });

  app.route({
    view: "dashboard",
    load: "dashboard.html",

    onReady: () => {
      $("#mainNav").show();
      $("#layoutSidenav_nav").show();
      $.get("assets/data/players.json").done((data) => {
        let members = "";

        data.map((member) => {
          members += `<tr>
                <td>${member.name}</td>
                <td>${member.membershipStatus}</td>
            </tr>`;
        });

        $("#dashboardTable > tbody").html(members);
        $("#dashboardTable").DataTable({
          columns: [{ data: "name" }, { data: "membership-status" }],
        });
      });
    },
  });

  app.route({
    view: "members",
    load: "members.html",

    onReady: () => {
      $("#mainNav").show();
      $("#layoutSidenav_nav").show();
      $.get("assets/data/players.json").done((data) => {
        let members = "";

        data.map((member) => {
          members += `<tr>
                <td><a href="?id=${member.playerID}#player-profile" class="text-black">${member.name} ${member.surname}</a></td>
                <td>${member.dateOfBirth}</td>
                <td>${member.gender}</td>
                <td>${member.birthplace}</td>
                <td>${member.category}</td>
                <td>${member.membershipStatus}</td>
            </tr>`;
        });

        $("#membersTable > tbody").html(members);

        $("#membersTable").DataTable({
          columns: [
            { data: "name" },
            { data: "date-of-birth" },
            { data: "gender" },
            { data: "birthplace" },
            { data: "category" },
            { data: "membership-status" },
          ],
        });
      });
    },
  });

  app.route({
    view: "tournaments",
    load: "tournaments.html",

    onReady: () => {
      $("#mainNav").show();
      $("#layoutSidenav_nav").show();
      $("#addTournamentButton").click(() => {
        $("#addTournamentModal").modal("show");
      });

      $("#closeModalButton").click(() => {
        $("#addTournamentModal").modal("hide");
      });

      $.get("assets/data/tournaments.json").done((data) => {
        let tournaments = "";

        data.map((tournament) => {
          tournaments += `<tr>
                <td><a href="?id=${
                  tournament.tournamentID
                }#tournament-info" class="text-black">${
            tournament.name
          }</a></td>
                <td>${tournament.date}</td>
                <td>${tournament.categories.join(", ")}</td>
                <td>${tournament.location}</td>
                <td>${tournament.status}</td>
            </tr>`;
        });

        $("#tournamentsTable > tbody").html(tournaments);

        $("#tournamentsTable").DataTable({
          columns: [
            { data: "name" },
            { data: "date" },
            { data: "categories" },
            { data: "location" },
            { data: "status" },
          ],
        });
      });
    },
  });

  app.route({
    view: "player-stats",
    load: "player-stats.html",

    onReady: () => {
      $("#mainNav").show();
      $("#layoutSidenav_nav").show();
      $.get("assets/data/players.json").done((data) => {
        let members = "";

        data.map((member) => {
          members += `<tr>
                <td>${member.name} ${member.surname}</td>
                <td>${member.category}</td>
                <td>${member.score}</td>
            </tr>`;
        });

        $("#playerStatsTable > tbody").html(members);
        $("#playerStatsTable").DataTable({
          columns: [{ data: "name" }, { data: "category" }, { data: "score" }],
        });
      });
    },
  });

  app.route({
    view: "registrations",
    load: "registrations.html",

    onReady: () => {
      $("#mainNav").show();
      $("#layoutSidenav_nav").show();
      $.get("assets/data/registrations.json").done((data) => {
        let registrations = "";

        data.map((registration) => {
          if (registration.status === "PENDING") {
            registrations += `<tr>
                <td>${registration.firstName} ${registration.lastName}</td>
                <td>${registration.email}</td>
                <td>${registration.dateOfBirth}</td>
                <td>${registration.gender}</td>
                <td>${registration.birthplace}</td>
                <td><div class="d-flex justify-content-around">
                <button class="btn btn-success w-50">Accept</button
                ><button class="btn btn-danger w-50">Reject</button>
              </div></td>
            </tr>`;
          }
        });

        $("#registrationsTable > tbody").html(registrations);

        $("#registrationsTable").DataTable({
          columns: [
            { data: "name" },
            { data: "email" },
            { data: "date-of-birth" },
            { data: "gender" },
            { data: "birthplace" },
            { data: "actions" },
          ],
        });
      });
    },
  });

  app.route({
    view: "tournament-info",
    load: "tournament-info.html",

    onReady: () => {
      $("#mainNav").show();
      $("#layoutSidenav_nav").show();

      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      $.get("assets/data/tournaments.json").done((data) => {
        const tournament = data.find((t) => t.tournamentID === id);

        $("#tournamentName").html(tournament.name);
        $("#tournamentDate").html("Date: " + tournament.date);
        $("#tournamentLocation").html("Location: " + tournament.location);
        $("#tournamentCategories").html(
          "Categories: " + tournament.categories.join(", ")
        );
      });

      $.get("assets/data/results.json").done((data) => {
        let results = "";

        data.map((result) => {
          results += `<tr>
                <td>${result.member}</td>
                <td>${result.opponent}</td>
                <td>${result.status}</td>
            </tr>`;
        });

        $("#tournamentInfoTable > tbody").html(results);
        $("#tournamentInfoTable").DataTable({
          columns: [
            { data: "member" },
            { data: "opponent" },
            { data: "result" },
          ],
        });
      });

      $("#addResultButton").click(() => {
        $("#addResultModal").modal("show");
      });

      $("#closeModalButton").click(() => {
        $("#addResultModal").modal("hide");
      });
    },
  });

  app.route({
    view: "player-profile",
    load: "player-profile.html",

    onReady: () => {
      $("#mainNav").show();
      $("#layoutSidenav_nav").show();
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      $.get("assets/data/players.json").done((data) => {
        const player = data.find((p) => p.playerID === id);

        $("#playerName").html(player.name + " " + player.surname);
        $("#playerTournamentScore").html("Tournament Score: " + player.score);
        $("#playerJoinDate").html("Joined on: " + player.joinDate);
        $("#playerDateOfBirth").html("Date Of Birth: " + player.dateOfBirth);
        $("#playerGender").html("Gender: " + player.gender);
        $("#playerBirthplace").html("Birthplace: " + player.birthplace);
        $("#playerCategory").html("Category: " + player.category);
        $("#playerMembershipStatus").html(
          "Membership Status: " + player.membershipStatus
        );
        $("#playerBadges").html("Badges: ");

        $("#updatePlayerButton").click(() => {
          $("#updatePlayerModal").modal("show");
        });

        $("[name='firstName']").val(player.name);
        $("[name='lastName']").val(player.surname);
        $("[name='dateOfBirth']").val(player.dateOfBirth);
        $("select[name='gender']").val(player.gender);

        $("#closeModalButton").click(() => {
          $("#updatePlayerModal").modal("hide");
        });
      });

      $.get("assets/data/results.json").done((data) => {
        let results = "";

        data.map((result) => {
          results += `<tr>
                <td>${result.opponent}</td>
                <td>${result.status}</td>
            </tr>`;
        });

        $("#playerProfileTable > tbody").html(results);
        $("#playerProfileTable").DataTable({
          columns: [{ data: "opponent" }, { data: "result" }],
        });
      });
    },
  });

  app.route({
    view: "login",
    load: "login.html",

    onReady: () => {
      $("#mainNav").hide();
      $("#layoutSidenav_nav").hide();
    },
  });

  app.route({
    view: "register",
    load: "register.html",

    onReady: () => {
      $("#mainNav").hide();
      $("#layoutSidenav_nav").hide();
    },
  });

  app.route({
    view: "apply",
    load: "apply.html",

    onReady: () => {
      $("#mainNav").hide();
      $("#layoutSidenav_nav").hide();
    },
  });

  app.run();
});
