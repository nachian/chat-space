module ControllerMacros
    def login(user)
        @request.env["devise.mapping"] = Devise.maping[:user]
        sign_in user

    end
end