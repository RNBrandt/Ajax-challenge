get '/' do
  redirect '/items'
end

get '/items' do
  @items = Item.all
  erb :index
end

post '/items' do
  @item = Item.new(title: params[:title], description: params[:description], due: params[:due])
  if @item.save
    if request.xhr?
      {html: (erb :"/partials/_items", layout: false), id: @item.id}.to_json
    else
      redirect "/items"
    end
  else
    @errors = @item.errors.full_messages
  end
end

get '/items/:id/edit' do
  @item = Item.find(params[:id])
  if request.xhr?
    {html: (erb :"/partials/_edit", layout: false), id: @item.id}.to_json
  else
    erb :edit
  end
end

get '/items/:id/completed' do
  @item = Item.find(params[:id])
  p @item.completed
  @item.save
  if request.xhr?
    # erb :'_complete', locals:{item: @item}
    (@item.complete).to_json
  else
    erb :'/'
  end
end

put '/items/:id' do
  @item = Item.find(params[:id])
  @item.update(title: params[:title], description: params[:description])
  if @item.save
    if request.xhr?
      {html: (erb :"/partials/_items", layout: false), id: @item.id}.to_json
    else
      redirect "/"
    end
  else
    @errors = @item.errors.full_messages
  end
end

delete '/items/:id' do
  @item = Item.find(params[:id])
  @item.destroy
  redirect "/"
end
