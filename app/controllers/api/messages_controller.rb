class Api::MessagesController < ApplicationController
    def index
        @message = Message.where('id > ?', params[:id])
    end
end