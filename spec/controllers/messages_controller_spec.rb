require 'rails_helper'

describe MessagesController, type: :controller do
    let(:user){ create(:user) }
    let(:group){ create(:group) }

    describe '#index' do
        context 'log in' do
            before do
                login user
                get :index, params: { group_id: group.id }
            end

            it 'assigns @message' do
                expect(assigns(:message)).to be_a_new(Message)
            end

            it 'assigns @group' do
                expect(assigns(:group)).to eq group
            end

            it 'render index' do
                expect(response).to render_template :index
            end
        end

        context ' not log in ' do
            before do
                get :index, params:{ group_id: group.id }
            end

            it 'redirects to new_user_session_path' do
                expect(response).to redirect_to(new_user_session_path)
            end
        end
    end
    
end