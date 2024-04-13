var Validate = {
  validateApplyForm: () => {
    $($("#applyForm")).validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        dateOfBirth: {
          required: true,
        },
        gender: {
          required: true,
        },
        birthplace: {
          required: true,
        },
      },

      messages: {
        firstName: {
          required: "Please enter a first name",
        },
        lastName: {
          required: "Please enter a last name",
        },
        email: {
          required: "Please enter an email",
          email: "Please enter a valid email",
        },
        dateOfBirth: {
          required: "Please enter a date of birth",
        },
        gender: {
          required: "Please select gender",
        },
        birthplace: {
          required: "Please enter your birthplace",
        },
      },

      submitHandler: function (f, e) {
        grecaptcha.ready(function () {
          grecaptcha
            .execute("6LfDPKspAAAAABrj0BsU6yudlW0Z_pFR3HhR0V_W", {
              action: "submit",
            })
            .then(function (token) {
              e.preventDefault();
              Utils.block_ui("#applyForm .card-body");
              const formData = $(f).serialize();
              console.log(formData);
              Utils.unblock_ui("#applyForm .card-body");
            });
        });
      },
    });
  },
  validateAddTournamentForm: () => {
    $($("#addTournamentForm")).validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      rules: {
        name: {
          required: true,
        },
        location: {
          required: true,
        },
        date: {
          required: true,
        },
        category: {
          required: true,
        },
      },

      messages: {
        name: {
          required: "Please enter a name",
        },
        date: {
          required: "Please enter a date date",
        },

        location: {
          required: "Please enter a location",
        },
        category: {
          required: "Please select at least one category",
        },
      },

      submitHandler: function (f, e) {
        e.preventDefault();
        Utils.block_ui("#addTournamentModal .modal-content");
        const formData = $(f).serialize().split("&");

        const tournament = {
          name: formData[0].split("=")[1],
          date: formData[1].split("=")[1],
          location: formData[2].split("=")[1],
          categories: formData
            .slice(3)
            .map((category) => category.split("=")[1]),
          status: "UPCOMING",
        };

        console.log(tournament);
        Utils.unblock_ui("#addTournamentModal .modal-content");
      },
    });
  },
  validateAddResultForm: () => {
    $($("#addResultForm")).validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      rules: {
        member: {
          required: true,
        },
        opponent: {
          required: true,
        },
        result: {
          required: true,
        },
      },

      messages: {
        member: {
          required: "Please select a member",
        },
        opponent: {
          required: "Please select an opponent",
        },
        result: {
          required: "Please select a result",
        },
      },

      submitHandler: function (f, e) {
        e.preventDefault();
        Utils.block_ui("#addResultModal .modal-content");
        const formData = $(f).serialize();
        console.log(formData);
        Utils.unblock_ui("#addResultModal .modal-content");
      },
    });
  },
  validateUpdateTournamentForm: () => {
    $($("#updateTournamentForm")).validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      rules: {
        name: {
          required: true,
        },
        location: {
          required: true,
        },
        date: {
          required: true,
        },
        category: {
          required: true,
        },
      },

      messages: {
        name: {
          required: "Please enter a name",
        },
        date: {
          required: "Please enter a date date",
        },

        location: {
          required: "Please enter a location",
        },
        category: {
          required: "Please select at least one category",
        },
      },

      submitHandler: function (f, e) {
        e.preventDefault();
        Utils.block_ui("#updateTournamentModal .modal-content");
        const formData = $(f).serialize().split("&");

        const tournament = {
          name: formData[0].split("=")[1],
          date: formData[1].split("=")[1],
          location: formData[2].split("=")[1],
          categories: formData
            .slice(3)
            .map((category) => category.split("=")[1]),
        };

        console.log(tournament);
        Utils.unblock_ui("#updateTournamentModal .modal-content");
      },
    });
  },
  validateRegisterForm: () => {
    $($("#registerForm")).validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
        confirmPassword: {
          required: true,
          equalTo: "#password",
        },
      },

      messages: {
        firstName: {
          required: "Please enter a first name",
        },
        lastName: {
          required: "Please enter a last name",
        },
        email: {
          required: "Please enter an email",
          email: "Please enter a valid email",
        },
        password: {
          required: "Please enter a password",
        },
        confirmPassword: {
          required: "Please confirm your password",
          equalTo: "Passwords do not match",
        },
      },

      submitHandler: function (f, e) {
        e.preventDefault();
        Utils.block_ui("#registerForm .card-body");
        const formData = $(f).serialize();
        console.log(formData);
        Utils.unblock_ui("#registerForm .card-body");
      },
    });
  },
  validateUpdateMemberForm: () => {
    $($("#updatePlayerForm")).validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        dateOfBirth: {
          required: true,
        },
        gender: {
          required: true,
        },
      },

      messages: {
        firstName: {
          required: "Please enter a first name",
        },
        lastName: {
          required: "Please enter a last name",
        },
        dateOfBirth: {
          required: "Please enter a date of birth",
        },
        gender: {
          required: "Please select gender",
        },
      },

      submitHandler: function (f, e) {
        e.preventDefault();
        Utils.block_ui("#updatePlayerModal .modal-content");
        const formData = $(f).serialize();
        console.log(formData);
        Utils.unblock_ui("#updatePlayerModal .modal-content");
      },
    });
  },
  validateLoginForm: () => {
    $($("#loginForm")).validate({
      errorElement: "span",
      errorClass: "help-block help-block-error",
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },

      messages: {
        email: {
          required: "Please enter an email",
          email: "Please enter a valid email",
        },
        password: {
          required: "Please enter a password",
        },
      },

      submitHandler: function (f, e) {
        e.preventDefault();
        Utils.block_ui("#loginForm .card-body");
        const formData = $(f).serialize();
        console.log(formData);
        Utils.unblock_ui("#loginForm .card-body");
      },
    });
  },
};